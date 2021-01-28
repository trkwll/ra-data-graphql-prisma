import difference from 'lodash/difference';

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

export const computeFieldsToUpdate = (oldItems: Item[], newItems: Item[]) => {
  const oldIds = oldItems.map(v => v.id);
  return newItems
    .filter(v => oldIds.includes(v.id))
    .map(v => {
      const { id, ...data } = v;
      return { where: { id }, data };
    });
};

export const computeFieldsToCreate = (newItems: Item[]) => {
  return newItems.filter(v => typeof v.id === 'undefined');
};

export const computeFieldsToAddRemoveUpdate = (
  oldItems: Item[],
  newItems: Item[]
) => ({
  fieldsToAdd: computeFieldsToAdd(oldItems, newItems),
  fieldsToRemove: computeFieldsToRemove(oldItems, newItems),
  fieldsToUpdate: computeFieldsToUpdate(oldItems, newItems),
  fieldsToCreate: computeFieldsToCreate(newItems)
});
