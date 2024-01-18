import React from "react";
import { Layout } from "@/components/Layout";
import { store } from "@/shared/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </Provider>
  );
}
