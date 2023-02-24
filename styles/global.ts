import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }
  body {
    color: #383838;
    font-family: 'Noto Sans KR', sans-serif;;
    letter-spacing: -0.02em;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
    font-family: 'Noto Sans KR', sans-serif;;
  }
  textarea {
    border: none;
    outline: none;
    font-family: 'Noto Sans KR', sans-serif;;
    overflow: auto;
    resize: none;
  }
  ul {
    list-style: none;
  }
  li {
    list-style-type : none;
  }
  :focus{
    outline: none;
  }
  @keyframes skeleton-ui{
    0%{
      background-color: rgba(185, 185, 185, 0.1);
    }
    50%{
      background-color: rgba(185, 185, 185, 0.3);
    }
    100%{
      background-color: rgba(185, 185, 185, 0.1);
    }
  }
  @-webkit-keyframes skeleton-ui{
    0%{
      background-color: rgba(185, 185, 185, 0.1);
    }
    50%{
      background-color: rgba(185, 185, 185, 0.3);
    }
    100%{
      background-color: rgba(185, 185, 185, 0.1);
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-webkit-keyframes fadeout {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
  }
`;
