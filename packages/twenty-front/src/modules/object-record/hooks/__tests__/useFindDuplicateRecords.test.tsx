import { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { useFindDuplicateRecords } from '@/object-record/hooks/useFindDuplicateRecords';
import { SnackBarProviderScope } from '@/ui/feedback/snack-bar-manager/scopes/SnackBarProviderScope';

import {
  query,
  responseData,
  variables,
} from '../__mocks__/useFindDuplicateRecords';

const mocks = [
  {
    request: {
      query,
      variables,
    },
    result: jest.fn(() => ({
      data: responseData,
    })),
  },
];

const Wrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <SnackBarProviderScope snackBarManagerScopeId="snack-bar-manager">
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    </SnackBarProviderScope>
  </RecoilRoot>
);

describe('useFindDuplicateRecords', () => {
  it('should fetch duplicate records and return the correct data', async () => {
    const objectRecordId = '6205681e-7c11-40b4-9e32-f523dbe54590';
    const objectNameSingular = 'person';

    const { result } = renderHook(
      () =>
        useFindDuplicateRecords({
          objectRecordIds: [objectRecordId],
          objectNameSingular,
        }),
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.results).toBeDefined();
    });

    expect(mocks[0].result).toHaveBeenCalled();
  });
});
