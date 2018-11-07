import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PrivateRoute from './privateroute'
import FamilyContainer from '../family/family';
import register from '../user/register';
import login from '../user/login';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Container>
            <Route exact path="/" component={login}/>
            <Route exact path="/Login" component={login}/>
            <Route exact path="/Register" component={register}/>
            <PrivateRoute path="/Family" component={FamilyContainer} />
          </Container>
        </BrowserRouter>
    );
  }
}

export default App;