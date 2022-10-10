import { FC } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/cache";
import { Provider as ReduxProvider } from "react-redux";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import { store } from "./store";
import { SettingsConsumer, SettingsProvider } from "../src/context/settings-context";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { createEmotionCache } from "utils/create-emotion-cache";
import { createTheme } from "theme";
type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();

  const locale = router.locale || router.defaultLocale || "en";

  // initialize Socket communication

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeProvider
                theme={createTheme({
                  direction: settings.direction,
                  responsiveFontSizes: settings.responsiveFontSizes,
                  mode: settings.theme,
                })}
              >
                <CssBaseline />
                <Toaster position="top-center" />
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;

{
  /*  <I18nProvider i18n={i18n}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <SocketProvider>
                <SettingsProvider>
                  <SettingsConsumer>
                    {({ settings }) => (
                      <ThemeProvider
                        theme={createTheme({
                          direction: settings.direction,
                          responsiveFontSizes: settings.responsiveFontSizes,
                          mode: settings.theme,
                        })}
                      >
                        <RTL direction={settings.direction}>
                          <CssBaseline />
                          <Toaster position="top-center" />
                          <AuthConsumer>
                            {(auth) => (!auth.isInitialized ? <SplashScreen /> : )}
                          </AuthConsumer>
                        </RTL>
                      </ThemeProvider>
                    )}
                  </SettingsConsumer>
                </SettingsProvider>
              </SocketProvider>
            </AuthProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </I18nProvider> */
}
