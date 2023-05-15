import "@/styles/globals.css";
import { GlobalContextProvider } from "../context/GlobalProvider";

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}
