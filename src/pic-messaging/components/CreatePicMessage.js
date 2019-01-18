import React, { Component } from 'react'
import WebcamCapture from './WebcamCapture'
import UserList from './UserList'
import { uploadPic } from '../api.js'
import { createMessage } from '../api.js'
import notifications from '../notifications'

class CreatePicMessage extends Component {
  state = {
    receiver_id: '',
    picture_id: ''
  }

  setReceiverId = (id) => {
    // console.log('got receiver id', id)
    this.setState({
      receiver_id: id
    })
  }

  setPictureId = (id) => {
    // console.log('got pic id', id)
    this.setState({
      picture_id: id
    })
  }

  sendMessage = () => {
    createMessage(this.state.picture_id, this.state.receiver_id, this.props.user)
    this.props.flash(notifications.createMessageSuccess, 'flash-success')
  }

  render() {
    return (
      <div className="buttons">
        <WebcamCapture onClick={this.setPictureId}/>
        <UserList onSelect={this.setReceiverId}/>
        <button onClick={this.sendMessage}>Send image</button>
      </div>
    )
  }
}

export default CreatePicMessage
