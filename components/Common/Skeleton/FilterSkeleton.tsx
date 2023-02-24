import styled, { css } from 'styled-components';

type TProps = {
  fadeOut: boolean;
  positionStatic?: boolean;
};

type TWrapper = {
  attrFadeOut: boolean;
  positionStatic: boolean;
};

export default function FilterSkeleton({ fadeOut, positionStatic = false }: TProps) {
  return (
    <Wrapper attrFadeOut={fadeOut} positionStatic={positionStatic}>
      <TitleBox />
      <FilterBox />
    </Wrapper>
  );
}

const Wrapper = styled.div<TWrapper>`
  position: absolute;
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  top: 100;
  width: calc(100% - 390px);
  margin-top: 20px;
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

const TitleBox = styled.div`
  position: relative;
  width: 135px;
  height: 45px;
  margin-left: 5px;
  border-radius: 10px;
  animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;

const FilterBox = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
  border-radius: 6px;
  animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;
