import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';
import { RouterScrollProvider } from '@moxy/next-router-scroll';
import theme from '@styles/theme';
import { wrapper } from '@libs/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RouterScrollProvider>
          <Component {...pageProps} />
        </RouterScrollProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  //pathName
  const pathName = appContext.ctx.pathname;
  appProps.pageProps.pathName = pathName;

  //userAgent
  const userAgent = appContext.ctx.req
    ? appContext.ctx.req?.headers['user-agent']
    : navigator.userAgent;

  //Check Device
  const mobile = userAgent?.indexOf('Mobi');
  const OS = userAgent?.match(/iPhone|iPad|iPod/i);
  appProps.pageProps.userDevice = mobile !== -1 ? 'mobile' : 'desktop';
  appProps.pageProps.userOS = OS !== null ? 'ios' : 'android';

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
