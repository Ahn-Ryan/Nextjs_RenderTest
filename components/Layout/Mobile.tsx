import styled, { css } from 'styled-components';

type TProps = {
  children: React.ReactElement;
};

export default function MobileLayout({ children }: TProps) {
  // 모바일 버전 생략
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100vw;
  height: 100vh;
`;
