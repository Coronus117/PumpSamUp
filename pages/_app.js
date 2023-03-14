import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { Provider, useDispatch } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import store from "@/store";
import DbConnect from "@/components/db-connect";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider session={pageProps.session}>
        <DbConnect />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}
