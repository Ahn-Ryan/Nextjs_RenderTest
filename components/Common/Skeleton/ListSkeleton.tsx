import { useCallback } from 'react';
import styled, { css } from 'styled-components';

type TProps = {
  count: number;
  fadeOut: boolean;
  positionStatic?: boolean;
};

type TWrapper = {
  attrFadeOut: boolean;
  positionStatic: boolean;
};

export default function ListSkeleton({ count, fadeOut, positionStatic = false }: TProps) {
  const renderItem = useCallback(() => {
    const renderList = [];
    for (let i = 0; i < count; i++) {
      renderList.push(<ItemWrapper key={i}></ItemWrapper>);
    }
    return renderList;
  }, [count]);

  return (
    <Wrapper attrFadeOut={fadeOut} positionStatic={positionStatic}>
      <ListWrapper>{renderItem()}</ListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div<TWrapper>`
  position: absolute;
  top: 0;
  top: 157px;
  width: calc(100% - 390px);
  overflow: hidden;
  opacity: 1;
  visibility: visible;
  ${props =>
    props.attrFadeOut &&
    css`
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s ease-out;
    `}
  ${props =>
    props.positionStatic &&
    css`
      position: static;
    `}
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 25px;
`;

const ItemWrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  width: calc(25% - 19px);
  height: 413px;
  cursor: pointer;
  animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;
