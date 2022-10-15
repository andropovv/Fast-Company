import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import UsersPage from "./components/pages/UsersPage";

const App = () => {
  return (
    <div className="conteiner">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route
            path="/users/:userId?"
            render={(props) => <UsersPage {...props} />}
          />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
