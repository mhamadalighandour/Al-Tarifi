import React from "react";
import Login from "./components/Login";
import "./App.css";
import Page from "./components/Page";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import RequireAuth, { RequireLogin } from "./components/RequireAuth";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>not defined page</h1>} />
        <Route
          path={"/login"}
          element={
            <RequireLogin>
              <Login />
            </RequireLogin>
          }
        />
        <Route
          path={`/`}
          element={
            <RequireAuth>
              <Page />
            </RequireAuth>
          }
        />
        <Route
          path="/changepassword"
          element={
            <RequireAuth>
              <ChangePassword />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
