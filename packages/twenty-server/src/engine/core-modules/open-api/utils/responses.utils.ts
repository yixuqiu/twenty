import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { capitalize } from 'src/utils/capitalize';

export const getFindManyResponse200 = (
  item: Pick<ObjectMetadataEntity, 'nameSingular' | 'namePlural'>,
  fromMetadata = false,
) => {
  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                [item.namePlural]: {
                  type: 'array',
                  items: {
                    $ref: `#/components/schemas/${capitalize(
                      item.nameSingular,
                    )}${!fromMetadata ? ' with Relations' : ''}`,
                  },
                },
              },
            },
            pageInfo: {
              type: 'object',
              properties: {
                hasNextPage: { type: 'boolean' },
                startCursor: { type: 'string' },
                endCursor: { type: 'string' },
              },
            },
            ...(!fromMetadata && {
              totalCount: {
                type: 'integer',
              },
            }),
          },
          example: {
            data: {
              [item.namePlural]: [
                `${capitalize(item.nameSingular)}Object1`,
                `${capitalize(item.nameSingular)}Object2`,
                '...',
              ],
            },
            pageInfo: {
              hasNextPage: true,
              startCursor: '56f411fb-0900-4ffb-b942-d7e8d6709eff',
              endCursor: '93adf3c6-6cf7-4a86-adcd-75f77857ba67',
            },
            totalCount: 132,
          },
        },
      },
    },
  };
};

export const getFindOneResponse200 = (
  item: Pick<ObjectMetadataEntity, 'nameSingular'>,
  fromMetadata = false,
) => {
  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                [item.nameSingular]: {
                  $ref: `#/components/schemas/${capitalize(item.nameSingular)}${
                    !fromMetadata ? ' with Relations' : ''
                  }`,
                },
              },
            },
          },
          example: {
            data: {
              [item.nameSingular]: `${capitalize(item.nameSingular)}Object`,
            },
          },
        },
      },
    },
  };
};

export const getCreateOneResponse201 = (
  item: Pick<ObjectMetadataEntity, 'nameSingular'>,
  fromMetadata = false,
) => {
  const one = fromMetadata ? 'One' : '';

  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                [`create${one}${capitalize(item.nameSingular)}`]: {
                  $ref: `#/components/schemas/${capitalize(item.nameSingular)}`,
                },
              },
            },
          },
          example: {
            data: {
              [`create${one}${capitalize(item.nameSingular)}`]: `${capitalize(
                item.nameSingular,
              )}Object`,
            },
          },
        },
      },
    },
  };
};

export const getCreateManyResponse201 = (
  item: Pick<ObjectMetadataEntity, 'nameSingular' | 'namePlural'>,
) => {
  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                [`create${capitalize(item.namePlural)}`]: {
                  type: 'array',
                  items: {
                    $ref: `#/components/schemas/${capitalize(
                      item.nameSingular,
                    )}`,
                  },
                },
              },
            },
          },
          example: {
            data: {
              [`create${capitalize(item.namePlural)}`]: [
                `${capitalize(item.nameSingular)}Object1`,
                `${capitalize(item.nameSingular)}Object2`,
                '...',
              ],
            },
          },
        },
      },
    },
  };
};

export const getUpdateOneResponse200 = (
  item: Pick<ObjectMetadataEntity, 'nameSingular'>,
  fromMetadata = false,
) => {
  const one = fromMetadata ? 'One' : '';

  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                [`update${one}${capitalize(item.nameSingular)}`]: {
                  $ref: `#/components/schemas/${capitalize(item.nameSingular)}`,
                },
              },
            },
          },
          example: {
            data: {
              [`update${one}${capitalize(item.nameSingular)}`]: `${capitalize(
                item.nameSingular,
              )}Object`,
            },
          },
        },
      },
    },
  };
};

export const getDeleteResponse200 = (
  item: Pick<ObjectMetadataEntity, 'nameSingular'>,
  fromMetadata = false,
) => {
  const one = fromMetadata ? 'One' : '';

  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                [`delete${one}${capitalize(item.nameSingular)}`]: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                    },
                  },
                },
              },
            },
          },
          example: {
            data: {
              [`delete${one}${capitalize(item.nameSingular)}`]: {
                id: 'ffe75ac3-9786-4846-b56f-640685c3631e',
              },
            },
          },
        },
      },
    },
  };
};

export const getJsonResponse = () => {
  return {
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            openapi: { type: 'string' },
            info: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                termsOfService: { type: 'string' },
                contact: {
                  type: 'object',
                  properties: { email: { type: 'string' } },
                },
                license: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    url: { type: 'string' },
                  },
                },
              },
            },
            servers: {
              type: 'array',
              items: {
                url: { type: 'string' },
                description: { type: 'string' },
              },
            },
            components: {
              type: 'object',
              properties: {
                schemas: { type: 'object' },
                parameters: { type: 'object' },
                responses: { type: 'object' },
              },
            },
            paths: {
              type: 'object',
            },
            tags: {
              type: 'object',
            },
          },
        },
      },
    },
  };
};
