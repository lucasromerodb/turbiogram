import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload.js'
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
      user: null,
      pictures: []
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })
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

  handleUpload(event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`)
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentaje
      })
    }
    , error => {console.log(error.message)}
    , () => {
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      }
      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  renderLoginButton() {
    // si el usuario está logeado
    if (this.state.user) {
      return(
        <div>
          <img width="240" height="240" className="profile-picture" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola, {this.state.user.displayName}</p>
          <button style={buttonstyle} onClick={this.handleLogout}>Cerrar sesión</button>

          <FileUpload onUpload={this.handleUpload} />

          {this.state.pictures.map(picture => (
            <div className="post">
              <img className="post-user" width="24" src={picture.photoURL} alt={picture.displayName} />
              <br />
              <span>Subido por: {picture.displayName}</span>
              <br />
              <img src={picture.image} alt="Foto subida" />

            </div>
          )).reverse()
          }

        </div>
      );
    } else {
      // sino lo está
      return(
        <button style={buttonstyle} onClick={this.handleAuth}>Inicia sesión con tu cuenta de Google</button>
      )
    }
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
