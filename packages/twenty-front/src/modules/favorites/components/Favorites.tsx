import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { Avatar } from 'twenty-ui';

import { FavoritesSkeletonLoader } from '@/favorites/components/FavoritesSkeletonLoader';
import { useIsPrefetchLoading } from '@/prefetch/hooks/useIsPrefetchLoading';
import { DraggableItem } from '@/ui/layout/draggable-list/components/DraggableItem';
import { DraggableList } from '@/ui/layout/draggable-list/components/DraggableList';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { getImageAbsoluteURIOrBase64 } from '~/utils/image/getImageAbsoluteURIOrBase64';

import { useFavorites } from '../hooks/useFavorites';

const StyledContainer = styled(NavigationDrawerSection)`
  width: 100%;
`;

const StyledAvatar = styled(Avatar)`
  :hover {
    cursor: grab;
  }
`;

const StyledNavigationDrawerItem = styled(NavigationDrawerItem)`
  :active {
    cursor: grabbing;

    .fav-avatar:hover {
      cursor: grabbing;
    }
  }
`;

export const Favorites = () => {
  const { favorites, handleReorderFavorite } = useFavorites();
  const loading = useIsPrefetchLoading();

  const { toggleNavigationSection, isNavigationSectionOpenState } =
    useNavigationSection('Favorites');
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

  if (loading) {
    return <FavoritesSkeletonLoader />;
  }

  if (!favorites || favorites.length === 0) return <></>;

  return (
    <StyledContainer>
      <NavigationDrawerSectionTitle
        label="Favorites"
        onClick={() => toggleNavigationSection()}
      />
      {isNavigationSectionOpen && (
        <DraggableList
          onDragEnd={handleReorderFavorite}
          draggableItems={
            <>
              {favorites.map((favorite, index) => {
                const {
                  id,
                  labelIdentifier,
                  avatarUrl,
                  avatarType,
                  link,
                  recordId,
                } = favorite;

                return (
                  <DraggableItem
                    key={id}
                    draggableId={id}
                    index={index}
                    itemComponent={
                      <StyledNavigationDrawerItem
                        key={id}
                        label={labelIdentifier}
                        Icon={() => (
                          <StyledAvatar
                            entityId={recordId}
                            avatarUrl={getImageAbsoluteURIOrBase64(avatarUrl)}
                            type={avatarType}
                            placeholder={labelIdentifier}
                            className="fav-avatar"
                          />
                        )}
                        to={link}
                      />
                    }
                  />
                );
              })}
            </>
          }
        />
      )}
    </StyledContainer>
  );
};
