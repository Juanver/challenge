import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from '../Home';
import ArmaTuPlan from '../Pages/ArmaTuPlan';
import Error404 from '../Pages/Error404';
import Gracias from '../Pages/Gracias';

const App = () => {
    return ( 
        <Router Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/arma-tu-plan/:id/:tag"  component={ArmaTuPlan} />
                    <Route exact path="/gracias/:id"  component={Gracias} />

                    <Route component={ Error404 }/>
                </Switch>
        </Router>
     );
}
export default App;