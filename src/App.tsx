import React from "react";
import { Layout } from "antd";
import Home from "./pages/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import CreateEditBookingContextProvider from "./contexts/CreateEditBookingContext";
import Header from "./components/Header/Header";

const { Content } = Layout;

const App: React.FC = () => {
  return (
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
  );
};

export default App;
