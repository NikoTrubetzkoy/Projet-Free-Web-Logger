import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import user from "../reducers/user";

const store = configureStore({
  reducer: { user },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}
