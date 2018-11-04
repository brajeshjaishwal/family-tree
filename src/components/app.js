import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PrivateRoute from './privateroute'
import familytree from './familytree';
import register from './register';
import login from './login';


class App extends Component {
  render() {
    let user = localStorage.getItem('name')
    let isAuth = user ? true : false
    return (
        <BrowserRouter>
          <Container>
            <header>My Family</header>
            <Route exact path="/" component={familytree}/>
            <Route exact path="/Login" component={login}/>
            <Route exact path="/Register" component={register}/>
            <PrivateRoute path="/Family" isAuth={isAuth} component={familytree} />
          </Container>
        </BrowserRouter>
    );
  }
}

export default App;