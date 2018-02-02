import React, {Component} from 'react';
// import firebase from 'firebase';


var buttonstyle = {
  padding: 20,
  borderRadius: 5,
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
        <input type="file" style={buttonstyle} onChange={this.props.onUpload} />
        <br />
        <progress value={this.state.uploadValue} max="100"></progress>
        <hr />
      </div>
    )
  }
}

export default FileUpload;
