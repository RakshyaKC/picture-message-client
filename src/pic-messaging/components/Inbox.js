import React, { Component } from 'react'
import Message from './Message'
import { getMessage } from '../api.js'
// import { seenMessage } from '../api.js'

class Inbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message: []
    }
  }
  // wrapping get message so we can attach set interval of 1 sec on the api call
  wrapGetMessage = () => {
    getMessage(this.props.user)
      .then(res => res.json())
      .then(resJson => this.setState({
        messages: resJson.messages
      }))
  }

  componentDidMount() {
    setInterval(this.wrapGetMessage, 1000)
  }

  render() {
    return (
      <div className="message-list">
        {this.state.messages.map((message) =>
          <Message key={message.id} message={message} user={this.props.user}/>
        )}
      </div>
    )
  }
}
export default Inbox
