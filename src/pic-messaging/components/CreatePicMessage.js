import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import WebcamCapture from './WebcamCapture'
import UserList from './UserList'
import { uploadPic } from '../api.js'
import { createMessage } from '../api.js'

class CreatePicMessage extends Component {
  state = {
    receiver_id: '',
    picture_id: ''
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted:', acceptedFiles)
    uploadPic(acceptedFiles)
      .then(res => res.json())
      .then(resJson => console.log(resJson.picture.image.image.url))
    // console.error('Rejected:', rejectedFiles)
  }

  setReceiverId = (id) => {
    console.log('got receiver id', id)
    this.setState({
      receiver_id: id
    })
  }

  setPictureId = (id) => {
    console.log('got pic id', id)
    this.setState({
      picture_id: id
    })
  }

  sendMessage = () => {
    createMessage(this.state.picture_id, this.state.receiver_id, this.props.user)
  }

  render() {
    return (
      <React.Fragment>
        <WebcamCapture onClick={this.setPictureId}/>
        <UserList onSelect={this.setReceiverId}/>
        <button onClick={this.sendMessage}>Send image</button>
        <Dropzone onDrop={this.onDrop}>
          {/* built in things*/}
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )
          }}
        </Dropzone>
      </React.Fragment>
    )
  }
}

export default CreatePicMessage
