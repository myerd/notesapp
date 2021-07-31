import './App.css';
import React from 'react';
import LoginPage from './components/LoginPage';
import NotesList from './components/NotesList';
import { Switch, Route, Redirect } from 'react-router-dom';
import { login, register } from './services/UserService';
import { getNotes } from './services/NoteService';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLogged: false,
      token: ""
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      this.setState(state, () => {
        if (this.state.isLogged) {
          this.getList();
        }
      })
    }

  }

  clearState = () => {
    this.setState({
      list: [],
      isLogged: false,
      token: ""
    }, () => {
      this.saveToStorage()
    })
  }

  saveToStorage = () => {
    sessionStorage.setItem("state", JSON.stringify(this.state));
  }

  logi = () => {
    let data = login();
    this.setState({
      isLogged: true,
      token: data.token
    }, () => {
      this.saveToStorage();
      this.getList();
    })
  }

  getList = () => {
    getNotes();
  }

  render() {
    return (
      <div className="App">
        <LoginPage register={this.registe} login={this.logi} />
      </div>
    );
  }
}

export default App;
