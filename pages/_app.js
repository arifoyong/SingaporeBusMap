import "../public/styles/index.css";
import { StateProvider } from "../stores/store";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}
