import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '@libs/redux/modules';
import { CountDownView } from '@libs/hooks/useTimer';
import { GET_CAR_REQUEST } from '@libs/redux/modules/product/actions';
import { validateMeasureUp, validateMile, validateSplitDay } from '@libs/utils/validation';
import SlideBanner from '@components/Common/Banner/SlideBanner';
import LoadingSpinner from '@components/Common/Loading/Spinner';

type TProps = {
  carid: string | null;
};

type TStatusBox = {
  attrStatus: string;
};

type TDetailBox = {
  attrPaddingTop: string;
};

export default function ProductComponent({ carid }: TProps) {
  // Root State
  const { carDetail, isLoadingCarDetail } = useSelector((state: RootState) => state.product);
  // Hooks
  const dispatch = useDispatch();

  const validateStatus = useCallback((status: string) => {
    switch (status) {
      case 'approved':
        return '경매진행중';
      case 'ended':
        return '선택대기중';
      case 'expired':
        return '유효기간만료';
    }
  }, []);

  const validateText = useCallback((text: string) => {
    switch (text) {
      case 'gasoline':
        return '휘발유';
      case 'diesel':
        return '경유';
      case 'auto':
        return '오토';
      case 'manual':
        return '수동';
    }
  }, []);

  useEffect(() => {
    dispatch({ type: GET_CAR_REQUEST, payload: { car_id: carid } });
  }, []);

  const renderCarDetail = useCallback(() => {
    if (!isLoadingCarDetail && carDetail !== null) {
      return (
        <>
          <SlideBlock>
            <SlideBanner data={carDetail.detail.images} />
          </SlideBlock>
          <DetailBlock>
            <StatusBox attrStatus={carDetail.auction.status}>
              <p>{validateStatus(carDetail.auction.status)}</p>
              {carDetail.auction.status !== 'expired' ? (
                <CountDownView attrDate={carDetail.auction.expire_at} />
              ) : null}
            </StatusBox>
            <DetailBox attrPaddingTop="0px">
              <NameBox>
                <h2>{carDetail.detail.name}</h2>
              </NameBox>
              <DescriptionBox>
                <p>{`${validateSplitDay(carDetail.detail.initial_registration_date)} (${
                  carDetail.detail.year
                }년형)`}</p>
                <p>{`${validateMile(carDetail.detail.mileage)} 만km`}</p>
                <p>{`${validateText(carDetail.detail.fuel)} ∙ ${validateText(
                  carDetail.detail.transmission,
                )} ∙ ${carDetail.detail.color}`}</p>
                <p>{carDetail.detail.location}</p>
              </DescriptionBox>
            </DetailBox>
            {carDetail.auction.status !== 'approved' ? (
              <DetailBox attrPaddingTop="20px">
                <AuctionBox>
                  <TextBox>
                    <p>경매 결과</p>
                  </TextBox>
                  <TableBox>
                    <TableItem>
                      <label>응찰달러수</label>
                      <p>{carDetail.auction.bids_count}</p>
                    </TableItem>
                    <TableItem>
                      <label>최고가</label>
                      <p>
                        {carDetail.auction.highest_bid
                          ? validateMeasureUp(carDetail.auction.highest_bid.price) + '만원'
                          : '없음'}
                      </p>
                    </TableItem>
                  </TableBox>
                </AuctionBox>
              </DetailBox>
            ) : null}
          </DetailBlock>
        </>
      );
    } else {
      return (
        <LoadingWrapper>
          <LoadingSpinner size={50} />
        </LoadingWrapper>
      );
    }
  }, [carDetail, isLoadingCarDetail]);

  return (
    <Wrapper>
      <TopbarArea>
        <LogoBox>
          <div />
        </LogoBox>
      </TopbarArea>
      <ContentArea>{renderCarDetail()}</ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.back_fa};
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

const ContentArea = styled.div`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'row')};
  height: 100vh;
  padding-top: 44px;
`;

const SlideBlock = styled.div`
  width: calc(100% - 320px);
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
  background-color: ${({ theme }) => theme.colors.white}; ;
`;

const DetailBlock = styled.div`
  width: 320px;
  padding: 20px;
`;

const StatusBox = styled.div<TStatusBox>`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 40px;
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

const DetailBox = styled.div<TDetailBox>`
  margin-top: ${props => props.attrPaddingTop};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray_eb};
  background-color: white;
`;

const NameBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  padding: 5px 0;
  & > h2 {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(22, 500, 35)};
  }
`;

const DescriptionBox = styled.div`
  margin-top: 20px;
  padding: 5px 0;
  & > p {
    margin: 5px 0;
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(13, 300, 17)};
  }
`;

const AuctionBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
`;

const TextBox = styled.div`
  & > p {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(15, 400, 20)};
  }
`;

const TableBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 100%;
`;

const TableItem = styled.div`
  width: 100px;
  margin-top: 20px;
  & > label {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(12, 300, 25)};
  }

  & > p {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(13, 400, 22)};
  }
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: calc(100vh - 150px);
`;
