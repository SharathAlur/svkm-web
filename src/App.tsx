import React from "react";
import { Layout } from "antd";
import Home from "./pages/Home/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import CreateEditBookingContextProvider from "./contexts/CreateEditBookingContext";
import Header from "./components/Header/Header";
import AuthContextProvider from "./contexts/AuthContextProvider";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <CreateEditBookingContextProvider>
        <Layout className={"app"}>
          <Header />
          <Content className="content">
            <BrowserRouter>
              <Switch>
                <Route path={"/home"}>
                  <Home />
                </Route>
                <Redirect path="/" to="/home" />
              </Switch>
            </BrowserRouter>
          </Content>
        </Layout>
      </CreateEditBookingContextProvider>
    </AuthContextProvider>
  );
};

export default App;
