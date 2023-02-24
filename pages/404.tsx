import styled from 'styled-components';
import Link from 'next/link';

export default function ClientError() {
  return (
    <Wrapper>
      <h1>접근할 수 없어요!</h1>
      <Link href={'/'} passHref>
        <ResetButtonBox>
          <p>홈으로 돌아가기</p>
        </ResetButtonBox>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  & > h1 {
    text-align: center;
  }
`;

const ResetButtonBox = styled.div`
  position: absolute;
  bottom: 20px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: calc(100% - 40px);
  height: 63px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.theme_44};
  cursor: pointer;
  & > p {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontSet(19, 500, 28)};
  }
`;
