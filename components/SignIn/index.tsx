import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { NAME_REGEX, PW_REGEX } from '@libs/utils/verification';
import { useDispatch } from 'react-redux';
import { POST_SIGN_IN_REQUEST } from '@libs/redux/modules/user/actions';

type TButtonBox = {
  attrDisabled: boolean;
};

export default function SignInComponent() {
  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Hooks
  const dispatch = useDispatch();
  // Function
  const onClickSignIn = useCallback(() => {
    dispatch({
      type: POST_SIGN_IN_REQUEST,
      payload: {
        username: username,
        password: password,
      },
    });
  }, [username, password]);

  return (
    <Wrapper>
      <ContentBlock>
        <TopBarBox>
          <LogoBox>
            <div />
          </LogoBox>
        </TopBarBox>
        <SignInBox>
          <InputBox>
            <label>유저네임</label>
            <input placeholder="계정: test" onChange={e => setUsername(e.target.value)} />
          </InputBox>
          <InputBox>
            <label>비밀번호</label>
            <input placeholder="비번: 0000" onChange={e => setPassword(e.target.value)} />
          </InputBox>
          <ButtonBox
            attrDisabled={!NAME_REGEX.test(username) || !PW_REGEX.test(password)}
            disabled={!NAME_REGEX.test(username) || !PW_REGEX.test(password)}
            onClick={onClickSignIn}
          >
            <p>로그인하기</p>
          </ButtonBox>
        </SignInBox>
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 100vh;
  padding: 0 30px;
  background-color: ${({ theme }) => theme.colors.back_fa};
`;

const ContentBlock = styled.div`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.black};
`;

const TopBarBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 50px;
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

const TitleBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  & > h1 {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontSet(15, 500, 20)};
  }
`;

const SignInBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  padding: 30px 20px;
`;

const InputBox = styled.div`
  width: 100%;
  padding: 5px 0px;
  & > label {
    color: ${({ theme }) => theme.colors.theme_44};
    ${({ theme }) => theme.fontSet(15, 500, 20)};
  }
  & > input {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding: 0 7px;
    border: 0.3px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.back_fa};
    &::placeholder {
      ${({ theme }) => theme.fontSet(14, 100, 15)};
    }
  }
`;

const ButtonBox = styled.button<TButtonBox>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.theme_73};
  & > p {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fontSet(13, 500, 18)};
  }
  ${props =>
    props.attrDisabled &&
    css`
      background-color: ${({ theme }) => theme.colors.deactive_de};
    `}
`;
