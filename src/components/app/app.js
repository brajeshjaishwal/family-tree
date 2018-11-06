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
    localStorage.setItem('name', 'brajesh')
    let user = localStorage.getItem('name')
    let isAuth = user ? true : false
    return (
        <BrowserRouter>
          <Container>
            <Route exact path="/" component={FamilyContainer}/>
            <Route exact path="/Login" component={login}/>
            <Route exact path="/Register" component={register}/>
            <PrivateRoute path="/Family" isAuth={isAuth} component={FamilyContainer} />
          </Container>
        </BrowserRouter>
    );
  }
}

export default App;