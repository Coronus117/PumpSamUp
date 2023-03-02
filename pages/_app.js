import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import store from "@/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}
