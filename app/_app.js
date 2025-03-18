"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

function MyApp({ children }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
