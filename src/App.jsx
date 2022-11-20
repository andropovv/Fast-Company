import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/UI/Navbar";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import Users from "./layouts/Users";

const App = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="main">
        <div className="main__containerr">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
