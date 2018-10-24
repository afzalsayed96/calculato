import React from "react";
import Calculator from "./Calculator";
import CalculatorApi from "./CalculatorAPi";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Calculator} />
          <Route path="*" component={CalculatorApi} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
