import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Joustes from "./components/joustes.component";
import JoustShow from "./components/joustShow.component"

//Как задеплоить
//https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7

class App extends Component {

  constructor() 
  {
    super();
    this.state = {
    };
  }

  logout()
  {
    localStorage.clear();
    window.open("/joustes", '_self');
  }

  renderHeader()
  {
    let logged = {};
    console.log("ID IS",localStorage.getItem("id"))
    if(localStorage.getItem("id") > 0)
    {
      logged = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <p className="nav-link">{localStorage.getItem("name")}</p>
          </li>

          <li className="nav-item">
            <Link className="nav-link" onClick={this.logout}>Выйти</Link>
          </li>
        </ul>
      )
    }
    else
    {
      logged = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>Войти</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/register"}>Зарегистрироваться</Link>
            </li>
        </ul>
      )
    }

    return (
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        {logged}
      </div>
    )
  }

  render ()
  {
    return (
    
      <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/joustes"}>Максим Проскуряков. ИКПИ-61. Диплом</Link>
              {this.renderHeader()}
          </div>
        </nav>
            
        <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={SignUp} mainState = {this.state} />
            <Route path="/login" component={Login} mainState = {this.state} />
            <Route path="/register" component={SignUp} mainState = {this.state} />
            <Route path="/joustes" component={Joustes} mainState = {this.state} />
            <Route path="/show-joust" component={JoustShow} mainState = {this.state} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
