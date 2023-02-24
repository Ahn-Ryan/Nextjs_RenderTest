import styled from 'styled-components';
import Link from 'next/link';

export default function ServerError() {
  return (
    <Wrapper>
      <h1>알 수 없는 이유로 중단 되었어요!</h1>
      <Link href={'/'} passHref>
        <ResetButtonBox>
          <p>다시 시도하기</p>
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
  bottom: 90px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: calc(100% - 40px);
  height: 63px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.theme_44};
  cursor: pointer;
  & > p {
    ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontSet(19, 500, 28)};
  }
`;
