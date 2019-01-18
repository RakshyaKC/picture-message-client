import React, { Component } from 'react'
import { seenMessage } from '../api.js'
import { deleteMessage } from '../api.js'

class Message extends Component {
  state = {
    shown: false
  }

  onShowMessage = () => {
    seenMessage(this.props.message.id, this.props.user)
    this.setState({
      shown: !this.state.shown
    })
  }

  onDeleteMessage = () => {
    deleteMessage(this.props.message.id, this.props.user)
  }

  render() {
    return (
      <div key={this.props.message.id}>
        {
          this.props.message.seen === true ?
            <h6 onClick={this.onShowMessage}>{this.props.message.sender.email}</h6>
            :
            <h6 onClick={this.onShowMessage} style={{fontWeight:'bold', color:'red'}}>{this.props.message.sender.email}</h6>
        }
        <button onClick={this.onDeleteMessage}>Delete</button>
        {
          this.state.shown === true ?
            <img src={this.props.message.picture.image.image.url}/> :
            null
        }
      </div>
    )
  }
}

export default Message
