import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import History from "./components/History";
import Settings from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "history", Component: History },
      { path: "settings", Component: Settings },
    ],
  },
]);
