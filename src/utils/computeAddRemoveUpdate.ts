import { IntrospectionInputObjectType } from 'graphql';
import difference from 'lodash/difference';
import {
  findInputFieldForType,
  inputFieldExistsForType
} from '../buildVariables';
import { IntrospectionResult } from '../constants/interfaces';

type ID = string;

type Item = {
  id: ID;
  [x: string]: any;
};

const formatId = (id: ID) => ({ id });

export const computeFieldsToAdd = (oldItems: Item[], newItems: Item[]) => {
  const newIds = newItems.map(v => v.id).filter(Boolean);
  const oldIds = oldItems.map(v => v.id);
  return difference(newIds, oldIds).map(formatId);
};

export const computeFieldsToRemove = (oldItems: Item[], newItems: Item[]) => {
  const newIds = newItems.map(v => v.id);
  const oldIds = oldItems.map(v => v.id);
  return difference(oldIds, newIds).map(formatId);
};

export const computeFieldsToUpdate = (
  oldItems: Item[],
  newItems: Item[],
  introspectionResults: IntrospectionResult,
  typeName: string
) => {
  const oldIds = oldItems.map(v => v.id);

  const type = findInputFieldForType(introspectionResults, typeName, 'update');

  if (!type) {
    return [];
  }

  const dataInputType = findInputFieldForType(
    introspectionResults,
    type.name,
    'data'
  );

  if (!dataInputType) {
    return [];
  }

  return newItems
    .filter(v => oldIds.includes(v.id))
    .map(v => {
      const { id, ...data } = v;
      return {
        where: { id },
        data: Object.keys(data).reduce((acc, key) => {
          const fieldExistsInType = inputFieldExistsForType(
            introspectionResults,
            dataInputType.name,
            key
          );

          if (!fieldExistsInType) {
            return acc;
          }

          acc[key] = data[key];
          return acc;
        }, {})
      };
    });
};

export const computeFieldsToCreate = (
  newItems: Item[],
  introspectionResults: IntrospectionResult,
  typeName: string
) => {
  const type = findInputFieldForType(introspectionResults, typeName, 'create');

  if (!type) {
    return [];
  }

  return newItems
    .filter(v => typeof v.id === 'undefined')
    .map(v =>
      Object.keys(v).reduce((acc, key) => {
        const fieldExistsInType = inputFieldExistsForType(
          introspectionResults,
          type.name,
          key
        );

        if (!fieldExistsInType) {
          return acc;
        }

        acc[key] = v[key];
        return acc;
      }, {})
    );
};

export const computeFieldsToAddRemoveUpdate = (
  oldItems: Item[],
  newItems: Item[],
  introspectionResults: IntrospectionResult,
  typeName: string
) => ({
  fieldsToAdd: computeFieldsToAdd(oldItems, newItems),
  fieldsToRemove: computeFieldsToRemove(oldItems, newItems),
  fieldsToUpdate: computeFieldsToUpdate(
    oldItems,
    newItems,
    introspectionResults,
    typeName
  ),
  fieldsToCreate: computeFieldsToCreate(
    newItems,
    introspectionResults,
    typeName
  )
});
