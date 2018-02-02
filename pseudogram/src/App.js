import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

var styles = {
  marginTop: 50
}

var buttonstyle = {
  padding: 20,
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 3px 15px lightgray',
  backgroundColor: 'white',
  color: 'gray',
  fontSize: 16
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      });
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido de la app.`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  renderLoginButton() {
    // si el usuario está logeado
    if (this.state.user) {
      return(
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola, {this.state.user.displayName}</p>
          <button style={buttonstyle} onClick={this.handleLogout}>Cerrar sesión</button>
        </div>
      );
    } else {
      return(
        <button style={buttonstyle} onClick={this.handleAuth}>Inicia sesión con tu cuenta de Google</button>
      )
    }
    // sino lo está
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Turbiogram</h1>
        </header>
        <div className="App-intro" style={styles}>
          {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
