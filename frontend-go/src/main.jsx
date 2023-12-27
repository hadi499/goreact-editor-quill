import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import store from "./store.js";
import { Provider } from "react-redux";
import PrivateLayout from "./components/PrivateLayout";
import Posts from "./pages/Posts";
import DetailPage from "./pages/DetailPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="" element={<PrivateLayout />}>
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
