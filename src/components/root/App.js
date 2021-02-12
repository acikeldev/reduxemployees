import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import {Route,Switch} from 'react-router-dom'
import CartDetail from "../cart/CartDetail"
import NotFound from "./NotFound"
function App() {
  return (
    <Container>
      <Navi></Navi>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/product" exact component={Dashboard}/>
        <Route path="/cart" exact component={CartDetail}/>
        <Route component={NotFound}/>
      </Switch>

    </Container>
  );
}

export default App;
