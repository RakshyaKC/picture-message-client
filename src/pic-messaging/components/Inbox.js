import React, { Component } from 'react'
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


  onShowMessage = event => {
    console.log('In onShowMessage ', this.state.messages)
    console.log(event)
    // this.setState({
    //   message: event.target.value
    // })
  }

  componentDidMount() {
    console.log('in inbox component')
    getMessage(this.props.user)
      .then(res => res.json())
      .then(resJson => this.setState({
        messages: resJson.messages
      }))
  }
  // setInterval(this.getMessage, 1000)

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.messages.map((message) =>
              <div key={message.id}>
                <button value={this.state.message} onClick={this.onShowMessage}>{message.sender.email}</button>
                <p>{message.picture.image.image.url}</p>
              </div>
            )}
          </li>
        </ul>
      </div>
    )
  }

  // <li>
  //   {this.state.messages.map((message) =>
  //     <image key={message.picture.id} value={this.state.message.picture}>{message.picture.url}<br/></image>
  //   )}
  // </li>
}
export default Inbox
