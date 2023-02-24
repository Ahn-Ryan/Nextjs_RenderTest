import styled from 'styled-components';
import { DotSpinner } from '@uiball/loaders';

type TProps = {
  size?: number;
  speed?: number;
};

export default function LoadingSpinner({ size = 30, speed = 0.9 }: TProps) {
  return (
    <Wrapper>
      <DotSpinner size={size} speed={speed} color="#444d69" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.colors.theme_44};
  @keyframes pulse {
    0%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
