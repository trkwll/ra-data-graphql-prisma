import {
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE
} from 'react-admin';
import buildVariables from './buildVariables';
import { TypeKind } from 'graphql/type/introspection';
import { IntrospectionResult, Resource } from './constants/interfaces';

describe('buildVariables', () => {
  describe('GET_LIST', () => {
    it('returns correct variables', () => {
      const introspectionResult = {
        types: [
          {
            kind: 'INPUT_OBJECT',
            name: 'PostWhereInput',
            inputFields: [{ name: 'tags_some', type: { kind: '', name: '' } }]
          }
        ]
      };
      const params = {
        filter: {
          ids: ['foo1', 'foo2'],
          tags: { id: ['tag1', 'tag2'] },
          'author.id': 'author1',
          views: 100
        },
        pagination: { page: 10, perPage: 10 },
        sort: { field: 'sortField', order: 'DESC' }
      };

      expect(
        buildVariables((introspectionResult as unknown) as IntrospectionResult)(
          { type: { name: 'Post' } } as Resource,
          GET_LIST,
          params
        )
      ).toEqual({
        where: {
          id_in: ['foo1', 'foo2'],
          tags_some: { id_in: ['tag1', 'tag2'] },
          author: { id: 'author1' },
          views: 100
        },
        first: 10,
        orderBy: 'sortField_DESC',
        skip: 90
      });
    });
  });

  describe('CREATE', () => {
    it('returns correct variables', () => {
      const introspectionResult = {
        types: [
          {
            name: 'Post',
            fields: [
              {
                name: 'title'
              }
            ]
          },
          {
            name: 'PostCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'author',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'AuthorCreateOneInput'
                  }
                }
              },
              {
                name: 'editor',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'EditorCreateOneInput'
                  }
                }
              },
              {
                name: 'tags',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'TagCreateManyInput'
                  }
                }
              },
              {
                name: 'keywords',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'PostCreateKeywordInput'
                  }
                }
              },
              {
                name: 'relatedPosts',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'RelatedPostCreateManyInput',
                  ofType: null
                }
              }
            ]
          },
          {
            name: 'AuthorCreateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'AuthorWhereUniqueInput'
                  }
                }
              }
            ]
          },
          {
            name: 'AuthorWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'EditorCreateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'EditorWhereUniqueInput'
                  }
                }
              }
            ]
          },
          {
            name: 'EditorWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              },
              {
                name: 'ref',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'TagCreateManyInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'TagWhereUniqueInput'
                  }
                }
              }
            ]
          },
          {
            name: 'TagWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'PostCreateKeywordInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'set',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.SCALAR
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'RelatedPostCreateManyInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'RelatedPostWhereUniqueInput'
                    }
                  }
                }
              },
              {
                name: 'create',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'RelatedPostCreateInput'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'RelatedPostWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'ID'
                }
              }
            ]
          },
          {
            name: 'RelatedPostCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'name',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          }
        ]
      };

      const params = {
        data: {
          author: { id: 'author1', name: 'author1name' },
          editor: { ref: 'editor1code', code: 'editor1name' },
          title: 'Foo',
          tags: [{ id: 'tags1' }, { id: 'tags2' }],
          keywords: ['keyword1', 'keyword2'],
          relatedPostsIds: ['relatedPost1', 'relatedPost2'],
          relatedPosts: [
            { id: 'relatedPost1', name: 'postName1' },
            { id: 'relatedPost2', name: 'postName2' }
          ]
        }
      };

      expect(
        buildVariables((introspectionResult as unknown) as IntrospectionResult)(
          { type: { name: 'Post' } } as Resource,
          CREATE,
          params
        )
      ).toEqual({
        data: {
          author: { connect: { id: 'author1' } },
          editor: { connect: { ref: 'editor1code' } },
          tags: {
            connect: [{ id: 'tags1' }, { id: 'tags2' }],
            create: []
          },
          keywords: { set: ['keyword1', 'keyword2'] },
          relatedPosts: {
            connect: [{ id: 'relatedPost1' }, { id: 'relatedPost2' }],
            create: []
          },
          title: 'Foo'
        }
      });
    });

    it('creates LabTest values correctly', () => {
      const introspectionResult = {
        types: [
          {
            name: 'LabTest',
            fields: [{ name: 'values' }]
          },
          {
            name: 'LabTestCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'values',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueUpdateManyInput'
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueUpdateManyInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'create',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueCreateInput'
                    }
                  }
                }
              },
              {
                name: 'connect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueWhereUniqueInput'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'name',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueNameCreateOneInput'
                  }
                }
              },
              {
                name: 'value',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'unit',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'unit_type',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueNameCreateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'create',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueNameCreateInput'
                    }
                  }
                }
              },
              {
                name: 'connect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueNameWhereUniqueInput'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueNameCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'name',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueNameWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueUpdateWithWhereUniqueNestedInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'where',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueWhereUniqueInput'
                  }
                }
              },
              {
                name: 'data',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueUpdateDataInput'
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          }
        ]
      };

      const params = {
        data: {
          values: [
            {
              name: { connect: { id: 'cbd' } },
              value: '2',
              unit: '%',
              unit_type: 'total'
            },
            {
              name: { connect: { id: 'thc' } },
              value: '1',
              unit: '%',
              unit_type: 'total'
            }
          ]
        }
      };

      expect(
        buildVariables((introspectionResult as unknown) as IntrospectionResult)(
          { type: { name: 'LabTest' } } as Resource,
          CREATE,
          params
        )
      ).toEqual({
        data: {
          values: {
            connect: [],
            create: [
              {
                name: { connect: { id: 'cbd' } },
                value: '2',
                unit: '%',
                unit_type: 'total'
              },
              {
                name: { connect: { id: 'thc' } },
                value: '1',
                unit: '%',
                unit_type: 'total'
              }
            ]
          }
        }
      });
    });
  });

  describe('UPDATE', () => {
    it('returns correct variables', () => {
      const introspectionResult = {
        types: [
          {
            name: 'Post',
            fields: [{ name: 'title' }]
          },
          {
            name: 'PostUpdateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'author',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'AuthorUpdateOneInput'
                  }
                }
              },
              {
                name: 'editor',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'EditorUpdateOneInput'
                  }
                }
              },
              {
                name: 'tags',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'TagsUpdateManyInput'
                  }
                }
              },
              {
                name: 'keywords',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'PostUpdateKeywordInput'
                  }
                }
              },
              {
                name: 'relatedPosts',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'RelatedPostUpdateManyInput',
                  ofType: null
                }
              },
              {
                name: 'thumbnail',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'AssetUpdateOneInput'
                  }
                }
              }
            ]
          },
          {
            name: 'AuthorUpdateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'AuthorWhereUniqueInput'
                  }
                }
              }
            ]
          },
          {
            name: 'AssetUpdateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'AssetWhereUniqueInput'
                  }
                }
              },
              {
                name: 'disconnect',
                type: {
                  kind: TypeKind.SCALAR,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'Boolean'
                  }
                }
              }
            ]
          },
          {
            name: 'EditorUpdateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'EditorWhereUniqueInput'
                  }
                }
              }
            ]
          },
          {
            name: 'TagsUpdateManyInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'TagsWhereUniqueInput'
                  }
                }
              },
              {
                name: 'update',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'TagsUpdateWithWhereUniqueInput'
                  }
                }
              }
            ]
          },
          {
            name: 'PostUpdateKeywordInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'set',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.SCALAR
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'RelatedPostUpdateManyInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'connect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'RelatedPostWhereUniqueInput'
                    }
                  }
                }
              },
              {
                name: 'disconnect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'RelatedPostWhereUniqueInput'
                    }
                  }
                }
              },
              {
                name: 'create',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'RelatedPostCreateInput'
                    }
                  }
                }
              },
              {
                name: 'update',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'RelatedPostUpdateWithWhereUniqueInput'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'TagsWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'AuthorWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'EditorWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'ref',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              },
              {
                name: 'code',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'RelatedPostWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'ID'
                }
              }
            ]
          },
          {
            name: 'AssetWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'RelatedPostCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'name',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'RelatedPostUpdateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'name',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'RelatedPostUpdateWithWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'where',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'RelatedPostWhereUniqueInput'
                }
              },
              {
                name: 'data',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'RelatedPostUpdateInput'
                }
              }
            ]
          },
          {
            name: 'TagsUpdateWithWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'where',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'TagWhereUniqueInput'
                }
              },
              {
                name: 'data',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'TagUpdateInput'
                }
              }
            ]
          },
          {
            name: 'TagUpdateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'code',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          }
        ]
      };

      const params = {
        data: {
          id: 'postId',
          tags: [
            { id: 'tags1', code: 'tags1code', thisShouldBeRemoved: null },
            { id: 'tags2', code: 'tags2scode' }
          ],
          keywords: ['keyword1', 'keyword2'],
          author: { id: 'author1', name: 'author1name' },
          editor: { ref: 'editor1code', code: 'editor1name' },
          relatedPostsIds: ['relatedPost1', 'relatedPost2'],
          relatedPosts: [
            { id: 'relatedPost1', name: 'postName1' },
            { id: 'relatedPost2', name: 'postName2' }
          ],
          title: 'Foo',
          thumbnail: null
        },
        previousData: {
          tags: [{ id: 'tags1' }, { id: 'tags3', thisShouldBeRemoved: null }],
          keywords: ['keyword1'],
          editor: { ref: 'editor2code', code: 'editor2name' },
          relatedPosts: [
            { id: 'relatedPost1', name: 'postName1' },
            { id: 'relatedPost3', name: 'postName3' }
          ],
          relatedPostsIds: ['relatedPost1', 'relatedPost3'],
          thumbnail: { id: 'foobar' }
        }
      };

      expect(
        buildVariables((introspectionResult as unknown) as IntrospectionResult)(
          { type: { name: 'Post' } } as Resource,
          UPDATE,
          params
        )
      ).toEqual({
        where: { id: 'postId' },
        data: {
          author: { connect: { id: 'author1' } },
          editor: { connect: { ref: 'editor1code' } },
          tags: {
            connect: [{ id: 'tags2' }],
            disconnect: [{ id: 'tags3' }],
            update: [],
            create: []
          },
          keywords: { set: ['keyword1', 'keyword2'] },
          relatedPosts: {
            connect: [{ id: 'relatedPost2' }],
            disconnect: [{ id: 'relatedPost3' }],
            update: [],
            create: []
          },
          title: 'Foo',
          thumbnail: { disconnect: true }
        }
      });
    });

    it('updates UserMeta correctly', () => {
      const introspectionResult = {
        types: [
          {
            name: 'User',
            fields: [{ name: 'name' }, { name: 'meta' }]
          },
          {
            name: 'UserMeta',
            fields: [{ name: 'bio' }, { name: 'dob' }]
          },
          {
            name: 'UserUpdateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'meta',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'UserMetaUpdateOneInput'
                  }
                }
              }
            ]
          },
          {
            name: 'UserMetaUpdateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'update',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'UserMetaUpdateDataInput'
                }
              }
            ]
          },
          {
            name: 'UserMetaUpdateDataInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'bio',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              },
              {
                name: 'dob',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          }
        ]
      };

      const params = {
        data: {
          id: 'user1',
          name: 'John Smith',
          meta: {
            id: 'userMeta1',
            bio: 'foobar',
            dob: '1993-01-01'
          }
        },
        previousData: {
          id: 'user1',
          name: 'John',
          meta: { id: 'userMeta1' }
        }
      };

      expect(
        buildVariables((introspectionResult as unknown) as IntrospectionResult)(
          { type: { name: 'User' } } as Resource,
          UPDATE,
          params
        )
      ).toEqual({
        where: { id: 'user1' },
        data: {
          name: 'John Smith',
          meta: {
            update: { bio: 'foobar', dob: '1993-01-01' }
          }
        }
      });
    });

    it('updates LabTest values correctly', () => {
      const introspectionResult = {
        types: [
          {
            name: 'LabTest',
            fields: [{ name: 'values' }]
          },
          {
            name: 'LabTestUpdateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'values',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueUpdateManyInput'
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueUpdateManyInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'create',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueCreateInput'
                    }
                  }
                }
              },
              {
                name: 'update',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueUpdateWithWhereUniqueNestedInput'
                    }
                  }
                }
              },
              {
                name: 'connect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueWhereUniqueInput'
                    }
                  }
                }
              },
              {
                name: 'disconnect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueWhereUniqueInput'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'name',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueNameCreateOneInput'
                  }
                }
              },
              {
                name: 'value',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'unit',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'unit_type',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueUpdateDataInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'name',
                type: {
                  kind: TypeKind.INPUT_OBJECT,
                  name: 'LabTestValueNameCreateOneInput'
                }
              },
              {
                name: 'value',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'unit',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              },
              {
                name: 'unit_type',
                type: {
                  kind: TypeKind.SCALAR,
                  type: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueNameCreateOneInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'create',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueNameCreateInput'
                    }
                  }
                }
              },
              {
                name: 'connect',
                type: {
                  kind: TypeKind.LIST,
                  ofType: {
                    kind: TypeKind.NON_NULL,
                    ofType: {
                      kind: TypeKind.INPUT_OBJECT,
                      name: 'LabTestValueNameWhereUniqueInput'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueNameCreateInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'name',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueNameWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          },
          {
            name: 'LabTestValueUpdateWithWhereUniqueNestedInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'where',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueWhereUniqueInput'
                  }
                }
              },
              {
                name: 'data',
                type: {
                  kind: TypeKind.NON_NULL,
                  ofType: {
                    kind: TypeKind.INPUT_OBJECT,
                    name: 'LabTestValueUpdateDataInput'
                  }
                }
              }
            ]
          },
          {
            name: 'LabTestValueWhereUniqueInput',
            kind: TypeKind.INPUT_OBJECT,
            inputFields: [
              {
                name: 'id',
                type: {
                  kind: TypeKind.SCALAR,
                  name: 'String'
                }
              }
            ]
          }
        ]
      };

      const params = {
        data: {
          id: 'labTest1',
          values: [
            {
              id: 'labTestValue1',
              name: { connect: { id: 'cbd' } },
              value: '2',
              unit: '%',
              unit_type: 'total'
            },
            {
              name: { connect: { id: 'thc' } },
              value: '1',
              unit: '%',
              unit_type: 'total'
            }
          ]
        },
        previousData: {
          id: 'labTest1',
          values: [
            {
              id: 'labTestValue1',
              name: { connect: { id: 'cbd' } },
              value: '1',
              unit: '%',
              unit_type: 'total'
            }
          ]
        }
      };

      expect(
        buildVariables((introspectionResult as unknown) as IntrospectionResult)(
          { type: { name: 'LabTest' } } as Resource,
          UPDATE,
          params
        )
      ).toEqual({
        where: { id: 'labTest1' },
        data: {
          values: {
            connect: [],
            disconnect: [],
            update: [
              {
                where: { id: 'labTestValue1' },
                data: {
                  name: { connect: { id: 'cbd' } },
                  value: '2',
                  unit: '%',
                  unit_type: 'total'
                }
              }
            ],
            create: [
              {
                name: { connect: { id: 'thc' } },
                value: '1',
                unit: '%',
                unit_type: 'total'
              }
            ]
          }
        }
      });
    });
  });

  describe('GET_MANY', () => {
    it('returns correct variables', () => {
      const params = {
        ids: ['tag1', 'tag2']
      };

      expect(
        buildVariables({} as IntrospectionResult)(
          { type: { name: 'Post' } } as Resource,
          GET_MANY,
          params
        )
      ).toEqual({
        where: { id_in: ['tag1', 'tag2'] }
      });
    });
  });

  describe('GET_MANY_REFERENCE', () => {
    it('returns correct variables', () => {
      const params = {
        target: 'author.id',
        id: 'author1',
        sort: { field: 'name', order: 'ASC' }
      };

      expect(
        buildVariables({} as IntrospectionResult)(
          { type: { name: 'Post' } } as Resource,
          GET_MANY_REFERENCE,
          params
        )
      ).toEqual({
        where: { author: { id: 'author1' } },
        orderBy: 'name_ASC'
      });
    });
  });

  describe('DELETE', () => {
    it('returns correct variables', () => {
      const params = {
        id: 'post1'
      };

      expect(
        buildVariables({} as IntrospectionResult)(
          { type: { name: 'Post', inputFields: [] } } as any,
          DELETE,
          params
        )
      ).toEqual({
        where: { id: 'post1' }
      });
    });
  });
});
