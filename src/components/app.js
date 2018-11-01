import React, { Component } from 'react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LoginComponent from './components/login'
import RegisterComponent from './components/register'
import FamilyTreeComponent from './components/familytree'
import PrivateRoute from './components/privateroute'

class App extends Component {
  render() {
    let user = localStorage.getItem('name')
    let isAuth = false
    if(user) isAuth = true
    return (
      <BrowserRouter>
        <Container>
          <header>My Family</header>
          <Route exact path="/" component={LoginComponent}/>
          <Route exact path="/Login" component={LoginComponent}/>
          <Route exact path="/Register" component={RegisterComponent}/>
          <PrivateRoute path="/Family" isAuth={isAuth} component={FamilyTreeComponent} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;