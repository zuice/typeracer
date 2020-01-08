import { AppPropsType } from 'next/dist/next-server/lib/utils';
import {
  ThemeProvider,
  ColorModeProvider,
  theme,
  CSSReset,
} from '@chakra-ui/core';

const MyApp = ({ Component, pageProps }: AppPropsType) => (
  <ColorModeProvider value="dark">
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  </ColorModeProvider>
);

export default MyApp;
