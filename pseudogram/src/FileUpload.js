import React, {Component} from 'react';
// import firebase from 'firebase';


var buttonstyle = {
  padding: 20,
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
  // boxShadow: '0 3px 15px lightgray',
  border: '1px solid lightgray',
  marginTop: 20,
  backgroundColor: 'white',
  color: 'gray',
  fontSize: 16
}

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadValue: 0,
    }
  }

  render() {
    return(
      <div>
        <progress value={this.state.uploadValue} max="100"></progress>
        <br />
        <input type="file" style={buttonstyle} onChange={this.props.onUpload} />
        <hr />
      </div>
    )
  }
}

export default FileUpload;
