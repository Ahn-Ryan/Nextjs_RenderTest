import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useScrollStore } from '@libs/zustand';
import { RootState } from '@libs/redux/modules';
import { TBrand, TGroup, TModel } from '@libs/models/main';
import LoadingSpinner from '@components/Common/Loading/Spinner';

type TProps = {
  children: React.ReactElement;
  brand: string | null;
  group: string | null;
  model: string | null;
};

type TCheckBox = {
  attrActive: boolean;
};

type TGroupWrapper = {
  attrVisible: boolean;
};

type TModelWrapper = {
  attrVisible: boolean;
};

export default function DesktopLayout({ children, brand, group, model }: TProps) {
  // Root State
  const { brands, groups, models, isLoadingBrands, isLoadingGroups, isLoadingModels } = useSelector(
    (state: RootState) => state.main,
  );
  const { scrollTop, scrollDirection, setScrollTop, setScrollDirection } = useScrollStore();
  // Hooks
  const router = useRouter();

  // Function
  const onClickRouteToReset = useCallback(() => {
    router.replace('/?&order=recent&page=1');
  }, []);

  const scrollMove = debounce(() => {
    if (window !== null) {
      const windowScrollTop = window.scrollY;
      if (windowScrollTop === 0) {
        setScrollTop(0);
        setScrollDirection('default');
      } else if (scrollTop < windowScrollTop) {
        setScrollTop(windowScrollTop);
        setScrollDirection('down');
      } else if (scrollTop > windowScrollTop) {
        setScrollTop(windowScrollTop);
        setScrollDirection('up');
      }
    }
  }, 50);

  // Scroll
  useEffect(() => {
    if (window !== null) {
      window.addEventListener('scroll', scrollMove);
      return () => {
        window?.removeEventListener('scroll', scrollMove);
      };
    }
  }, [scrollDirection, scrollTop]);

  // render Item
  const renderBrandItem = useCallback(
    (item: TBrand) => {
      return (
        <Link href={`/?brand=${item.id}&order=recent&page=1`}>
          <ItemWrapper>
            <CheckBox attrActive={Number(brand) === item.id}>
              <div />
            </CheckBox>
            <h2>{item.name}</h2>
            <p>{item.auctions_count}</p>
          </ItemWrapper>
          <GroupWrapper attrVisible={Number(brand) === item.id}>
            {Number(brand) === item.id ? renderGroupList() : null}
          </GroupWrapper>
        </Link>
      );
    },
    [brand, group, model, brands, groups, models],
  );

  const renderGroupItem = useCallback(
    (item: TGroup) => {
      return (
        <Link href={`/?brand=${brand}&group=${item.id}&order=recent&page=1`}>
          <ItemWrapper>
            <CheckBox attrActive={Number(group) === item.id}>
              <div />
            </CheckBox>
            <h2>{item.name}</h2>
            <p>{item.auctions_count}</p>
          </ItemWrapper>
          <ModelWrapper attrVisible={Number(group) === item.id}>
            {Number(group) === item.id ? renderModelList() : null}
          </ModelWrapper>
        </Link>
      );
    },
    [brand, group, model, brands, groups, models],
  );

  const renderModelItem = useCallback(
    (item: TModel) => {
      return (
        <Link href={`/?brand=${brand}&group=${group}&model=${item.id}&order=recent&page=1`}>
          <ItemWrapper>
            <CheckBox attrActive={Number(model) === item.id}>
              <div />
            </CheckBox>
            <h2>{item.name}</h2>
            <p>{item.auctions_count}</p>
          </ItemWrapper>
        </Link>
      );
    },
    [brand, group, model, brands, groups, models],
  );

  // render List
  const renderBrandList = useCallback(() => {
    if (!isLoadingBrands && brands !== null) {
      if (brands.length !== 0) {
        return (
          <ListWrapper>
            {brands
              .filter(item => item.auctions_count !== 0)
              .map(item => (
                <ul key={item.id}>{renderBrandItem(item)}</ul>
              ))}
          </ListWrapper>
        );
      } else {
        <NothingWrapper>
          <p>리스트가 없어요</p>
        </NothingWrapper>;
      }
    } else {
      return (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      );
    }
  }, [brand, group, model, brands, groups, models, isLoadingBrands]);

  const renderGroupList = useCallback(() => {
    if (!isLoadingGroups && groups !== null) {
      if (groups.length !== 0) {
        return (
          <ListWrapper>
            {groups
              .filter(item => item.auctions_count !== 0)
              .map(item => (
                <ul key={item.id}>{renderGroupItem(item)}</ul>
              ))}
          </ListWrapper>
        );
      } else {
        <NothingWrapper>
          <p>리스트가 없어요</p>
        </NothingWrapper>;
      }
    } else {
      return (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      );
    }
  }, [brand, group, model, brands, groups, models, isLoadingGroups]);

  const renderModelList = useCallback(() => {
    if (!isLoadingModels && models !== null) {
      if (models.length !== 0) {
        return (
          <ListWrapper>
            {models
              .filter(item => item.auctions_count !== 0)
              .map(item => (
                <ul key={item.id}>{renderModelItem(item)}</ul>
              ))}
          </ListWrapper>
        );
      } else {
        <NothingWrapper>
          <p>리스트가 없어요</p>
        </NothingWrapper>;
      }
    } else {
      return;
    }
  }, [brand, group, model, brands, groups, models, isLoadingModels]);

  return (
    <Wrapper>
      <TopbarArea>
        <LogoBox>
          <div />
        </LogoBox>
      </TopbarArea>
      <ContentArea>
        <NavigationBlock>
          <TitleRowBox>
            <h2>제조사/등급/모델</h2>
            <p onClick={onClickRouteToReset}>전체선택</p>
          </TitleRowBox>
          {renderBrandList()}
        </NavigationBlock>
        {children}
      </ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
`;

const TopbarArea = styled.div`
  position: fixed;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.theme_44};
`;

const LogoBox = styled.div`
  width: 100%;
  padding: 0px 10px;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  & > div {
    width: 80px;
    height: 30px;
    ${({ theme }) => theme.backgroundSet('/static/icons/common/logo-text-white.png', 'contain')};
  }
`;

const ContentArea = styled.section`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
  width: 100%;
  padding: 30px;
  margin-top: 45px;
  background-color: ${({ theme }) => theme.colors.back_fa};
  overflow-y: scroll;
`;

const NavigationBlock = styled.nav`
  width: 300px;
  margin-right: 30px;
  padding: 30px 0px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
`;

const TitleRowBox = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  & > h2 {
    margin-bottom: 10px;
    padding: 0 20px;
    color: ${({ theme }) => theme.colors.font_8b};
    ${({ theme }) => theme.fontSet(14, 400, 20)};
  }
  & > p {
    margin-bottom: 10px;
    padding: 0 20px;
    color: ${({ theme }) => theme.colors.font_7d};
    ${({ theme }) => theme.fontSet(12, 400, 20)};
    cursor: pointer;
  }
`;

// Item
const ItemWrapper = styled.li`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  height: 27px;
  padding-left: 20px;
  cursor: pointer;
  & > h2 {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(13, 300, 18)};
  }
  & > p {
    color: ${({ theme }) => theme.colors.theme_7d};
    ${({ theme }) => theme.fontSet(12, 300, 16)};
  }
`;

const CheckBox = styled.div<TCheckBox>`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
  border-radius: 50%;
  & > div {
    display: none;
  }
  ${props =>
    props.attrActive &&
    css`
      ${({ theme }) => theme.flexSet('center', 'center', 'row')};
      border: 1px solid ${({ theme }) => theme.colors.theme_73};
      & > div:nth-child(1) {
        display: block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.theme_73};
      }
    `}
`;

const GroupWrapper = styled.div<TGroupWrapper>`
  width: 100%;
  max-height: 0;
  overflow: hidden;
  ${props =>
    props.attrVisible &&
    css`
      margin: 10px 0;
      padding: 10px 0px 10px 20px;
      max-height: 2000px;
      overflow: hidden;
      border-top: 1px solid ${({ theme }) => theme.colors.gray_eb};
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray_eb};
      background-color: ${({ theme }) => theme.colors.back_f9};
      transition: max-height 0.7s ease-in-out;
    `}
`;

const ModelWrapper = styled.div<TModelWrapper>`
  width: 100%;
  max-height: 0;
  overflow: hidden;
  ${props =>
    props.attrVisible &&
    css`
      padding: 0px 20px;
      max-height: 2000px;
      overflow: hidden;
      transition: max-height 1.2s ease-in-out;
    `}
`;

// list
const ListWrapper = styled.div`
  width: 100%;
`;

const NothingWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 100px;
  background-color: #f8f8f8;
  & > p {
    ${({ theme }) => theme.fontSet(16, 300, 20)};
  }
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 100px;
`;
