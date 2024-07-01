import { Injectable } from '@nestjs/common';

import { capitalize } from 'src/utils/capitalize';

@Injectable()
export class DeleteQueryFactory {
  create(objectMetadataItem): string {
    const objectNameSingular = capitalize(objectMetadataItem.nameSingular);

    return `
      mutation Delete${objectNameSingular}($id: ID!) {
        delete${objectNameSingular}(id: $id) {
          id
        }
      }
    `;
  }
}
