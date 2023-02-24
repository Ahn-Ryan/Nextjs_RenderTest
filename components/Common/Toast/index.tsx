import useToast from '@libs/hooks/useToast';
import styled, { css, keyframes } from 'styled-components';

type TProps = {
  text: string;
  inverted: boolean;
};

type TWrapper = {
  attrVisible: boolean;
};

export default function Toast({ text, inverted }: TProps) {
  const { closeToast } = useToast();
  return (
    <Wrapper attrVisible={inverted}>
      <Block attrVisible={inverted} onClick={closeToast}>
        <CheckIcon />
        <p>{text}</p>
      </Block>
    </Wrapper>
  );
}

const fadeInUp = keyframes`
    0% {
        opacity: 0;
        visibility: hidden;
        transform: translate3d(0,-30px,0)
    }
    25% {
        transform: translate3d(0,0,0);
        opacity: 1;
        visibility: visible;
    }
    75% {
        transform: translate3d(0,0,0);
        opacity: 1;
        visibility: visible;
    }
    100%{
        transform: translate3d(0,-30px,0);
        opacity: 0;
        visibility: hidden;
    }
`;

const Wrapper = styled.aside<TWrapper>`
  position: fixed;
  top: 0;
  z-index: 0;
  visibility: hidden;
  width: 498px;
  ${props =>
    props.attrVisible &&
    css`
      z-index: 99;
      visibility: visible;
    `}
`;

const Block = styled.div<TWrapper>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  padding: 0 30px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.theme_44};
  box-shadow: 6px 6px 10px rgba(156, 153, 153, 0.2);
  ${props =>
    props.attrVisible &&
    css`
      animation: ${fadeInUp} 2s both;
    `}
`;
const CheckIcon = styled.div`
  width: 19.5px;
  height: 23.31px;
  margin: 0 22.5px 0 0;
  background-image: url('/static/icons/common/check.svg');
  background-size: 100% 100%;
`;
