import React, { Component } from 'react'
import { getMessage } from '../api.js'
// import { seenMessage } from '../api.js'

class Inbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      messages: []
    }
  }

  onShowMessages = () => {
    console.log('In onShowMessages ', event)
  }

  componentDidMount() {
    console.log('in inbox component')
    getMessage(this.props.user)
    // getMessage().then(res => console.log(res.json()))
    // setInterval(this.getMessages, 1000)
  }

  render() {
    return (
      <button onClick={this.onShowMessages} value="inbox">Inbox</button>
    )
  }
}
export default Inbox
