import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { validateMeasureUp, validateMile, validateSplitDay } from '@libs/utils/validation';
import styled, { css } from 'styled-components';
import {
  GET_BRANDS_REQUEST,
  GET_CARS_REQUEST,
  GET_MODELS_REQUEST,
  GET_MODEL_GROUPS_REQUEST,
} from '@libs/redux/modules/main/actions';
import { TCar } from '@libs/models/main';
import { RootState } from '@libs/redux/modules';
import { CountDownView } from '@libs/hooks/useTimer';
import ListSkeleton from '@components/Common/Skeleton/ListSkeleton';
import FilterSkeleton from '@components/Common/Skeleton/FilterSkeleton';

type TProps = {
  brand: string | null;
  group: string | null;
  model: string | null;
  order: string | null;
  page: string | null;
};

type TFilterList = {
  attrActive: boolean;
};

type TContentBlock = {
  fadeIn?: boolean;
};

type TItemWrapper = {
  attrDisabled: boolean;
  attrWidth: number;
};

type TStatusBox = {
  attrStatus: string;
};

export default function MainComponent({ brand, group, model, order, page }: TProps) {
  // Root State
  const { cars, isLoadingCars } = useSelector((state: RootState) => state.main);
  // State
  const [windowWidth, setWindowWidth] = useState(2000);
  const [filterToggle, setfilterToggle] = useState(false);

  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // Function
  const selectedType = useCallback(() => {
    if (model) {
      return ['model', model];
    } else {
      if (group) {
        return ['model_group', group];
      } else {
        if (brand) {
          return ['brand', brand];
        } else {
          return ['all', undefined];
        }
      }
    }
  }, [brand, group, model]);

  const validateStatus = useCallback(() => {
    if (order !== null) {
      switch (order) {
        case 'recent':
          return '최근 등록순';
        case 'bids_count':
          return '응찰 적은순';
      }
    }
  }, [order]);

  const auctionStatus = useCallback((status: string) => {
    switch (status) {
      case 'approved':
        return { text: '경매진행중' };
      case 'ended':
        return { text: '선택대기중' };
      case 'expired':
        return { text: '유효기간만료' };
    }
  }, []);

  const onClickRoutToOrder = useCallback(
    (order: string) => {
      router.push(
        `/?${brand ? 'brand=' + brand : ''}${group ? '&group=' + group : ''}${
          model ? '&model=' + model : ''
        }${'&order=' + order}&page=1`,
      );
      setfilterToggle(false);
    },
    [brand, group, model],
  );

  const onClickRouteToProduct = useCallback((id: number) => {
    router.push(`/product?carid=${id}`, undefined, { scroll: false });
  }, []);

  const onClickWindow = useCallback(
    (e: any) => {
      if (e.target.className !== 'filter') {
        setfilterToggle(false);
      }
    },
    [filterToggle],
  );

  // Fetch
  useEffect(() => {
    dispatch({ type: GET_BRANDS_REQUEST });
  }, []);

  useEffect(() => {
    if (brand !== null) {
      dispatch({
        type: GET_MODEL_GROUPS_REQUEST,
        payload: {
          brand_id: brand,
        },
      });
    }
  }, [brand]);

  useEffect(() => {
    if (group !== null) {
      dispatch({
        type: GET_MODELS_REQUEST,
        payload: {
          model_group_id: group,
        },
      });
    }
  }, [group]);

  useEffect(() => {
    dispatch({
      type: GET_CARS_REQUEST,
      payload: {
        type: selectedType()[0],
        id: selectedType()[1],
        order: order,
        page: page,
      },
    });
  }, [brand, group, model, order, page]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
    };
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('click', e => onClickWindow(e));
    return () => {
      window.removeEventListener('click', e => onClickWindow(e));
    };
  }, []);

  // render Item
  const renderCarItem = useCallback(
    (item: TCar) => {
      return (
        <>
          <ItemWrapper
            attrDisabled={item.auction.status === 'expired'}
            attrWidth={windowWidth}
            onClick={() => onClickRouteToProduct(item.id)}
          >
            <StatusBox attrStatus={item.auction.status}>
              <p>{auctionStatus(item.auction.status)?.text}</p>
              {item.auction.status !== 'expired' ? (
                <CountDownView attrDate={item.auction.expire_at} />
              ) : null}
            </StatusBox>
            <ThumbnailBox>
              {item.detail.main_image !== null ? (
                <Image
                  src={item.detail.main_image.url}
                  width="0"
                  height="0"
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  alt="thumbnail"
                  priority
                />
              ) : (
                <NothingImage />
              )}
            </ThumbnailBox>
            <DetailBox>
              <NameBox>
                <h2>{item.detail.name}</h2>
              </NameBox>
              <DescriptionBox>
                <p>{`${validateSplitDay(item.detail.initial_registration_date)} (${
                  item.detail.year
                }년형)`}</p>
                <p>{`${validateMile(item.detail.mileage)} 만km`}</p>
                <p>{item.detail.location}</p>
              </DescriptionBox>
            </DetailBox>
          </ItemWrapper>
        </>
      );
    },
    [cars, windowWidth],
  );

  // render List
  const renderCarList = useCallback(() => {
    if (cars !== null) {
      return (
        <ListWrapper>
          {cars.results
            .sort((a, b) => {
              return a.auction.status < b.auction.status ? -1 : 0;
            })
            .map(item => (
              <ul key={item.id}>{renderCarItem(item)}</ul>
            ))}
        </ListWrapper>
      );
    }
  }, [cars, windowWidth]);

  return (
    <Wrapper>
      {!isLoadingCars && cars !== null ? (
        cars.results.length !== 0 ? (
          <FlexRowWrapper>
            <FilterBlock>
              <TitleBox>
                <p>{`차량 ${validateMeasureUp(cars.count)}대`}</p>
              </TitleBox>
              <FilterBox className="filter" onClick={() => setfilterToggle(!filterToggle)}>
                <p className="filter">{validateStatus()}</p>
                <div className="filter" onClick={() => setfilterToggle(!filterToggle)} />
              </FilterBox>
              <FilterList attrActive={filterToggle}>
                <p onClick={() => onClickRoutToOrder('recent')}>최근 등록순</p>
                <p onClick={() => onClickRoutToOrder('bids_count')}>응찰 적은순</p>
              </FilterList>
            </FilterBlock>
            <ContentBlock fadeIn={!isLoadingCars && cars !== null}>{renderCarList()}</ContentBlock>
            <PaginationBlock>
              {/* <Pagenation brand={brand} group={group} model={model} order={order} page={page} /> */}
            </PaginationBlock>
          </FlexRowWrapper>
        ) : (
          <NothingWrapper>
            <p>판매중인 차가 없어요!</p>
          </NothingWrapper>
        )
      ) : (
        <></>
      )}
      <>
        <FilterSkeleton fadeOut={!isLoadingCars && cars !== null} />
        <ListSkeleton count={8} fadeOut={!isLoadingCars && cars !== null} />
      </>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 330px);
`;

const FlexRowWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
`;

const FilterBlock = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
`;

const TitleBox = styled.div`
  padding: 25px 15px;
  & > p {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(25, 300, 32)};
  }
`;

const FilterBox = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 120px;
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  & > p {
    width: 100%;
    height: 40px;
    padding: 8px 20px 8px 0;
    ${({ theme }) => theme.fontSet(14, 300, 20)};
    text-align: center;
  }
  & > div {
    position: absolute;
    top: 14px;
    right: 10px;
    width: 10px;
    height: 10px;
    padding-right: 10px;
    ${({ theme }) =>
      theme.backgroundSet('/static/icons/common/button-arrow-down-60.svg', '12px 10px')};
  }
`;

const FilterList = styled.div<TFilterList>`
  position: absolute;
  top: 135px;
  right: 30px;
  height: 0px;
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  width: 120px;
  visibility: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
  background-color: ${({ theme }) => theme.colors.white};
  & > p {
    width: 100%;
    height: 40px;
    padding: 7px 15px;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontSet(14, 300, 20)};
  }
  & > p:nth-child(1) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_eb};
  }
  ${props =>
    props.attrActive &&
    css`
      height: 80px;
      visibility: visible;
      transition: all 0.2s ease-out;
      cursor: pointer;
      & > p {
        color: ${({ theme }) => theme.colors.theme_44};
        transition: color 0.2s 0.2s ease-out;
        &:hover {
          ${({ theme }) => theme.fontSet(14, 400, 20)};
        }
      }
    `}
`;

const ContentBlock = styled.div<TContentBlock>`
  width: 100%;
  opacity: 0;
  visibility: hidden;
  ${props =>
    props.fadeIn &&
    css`
      opacity: 1;
      visibility: visible;
      transition: all 2s ease-out;
    `}
`;

const PaginationBlock = styled.div``;

// Item
const ItemWrapper = styled.li<TItemWrapper>`
  width: calc(25vw - 116.5px);
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  ${props =>
    props.attrWidth < 1300 &&
    css`
      width: calc(50vw - 208px);
    `}
  ${props =>
    props.attrWidth < 900 &&
    css`
      width: calc(100vw - 390px);
    `}
`;

const StatusBox = styled.div<TStatusBox>`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.back_de};
  background-color: ${({ theme }) => theme.colors.back_de};
  & > p {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontSet(13, 400, 18)};
  }
  ${props =>
    props.attrStatus === 'approved' &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.active_73};
      background-color: ${({ theme }) => theme.colors.active_73};
    `}
  ${props =>
    props.attrStatus === 'ended' &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.active_6f};
      background-color: ${({ theme }) => theme.colors.active_6f};
    `}
`;

const ThumbnailBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  overflow: hidden;
`;

const NothingImage = styled.div`
  width: 100%;
  height: 250px;
  ${({ theme }) => theme.backgroundSet('/static/images/nothing.png', 'cover')};
`;

const DetailBox = styled.div`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
  word-break: keep-all;
`;

const NameBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  padding: 5px 0;
  & > h2 {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(14, 500, 20)};
  }
`;
const DescriptionBox = styled.div`
  padding: 5px 0;
  & > p {
    margin: 5px 0;
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(13, 300, 17)};
  }
`;

// List
const ListWrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  flex-wrap: wrap;
  width: 100%;
  gap: 25px;
`;

const NothingWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 100px;
  background-color: #f8f8f8;
  & > p {
    ${({ theme }) => theme.fontSet(16, 300, 20)};
  }
`;
