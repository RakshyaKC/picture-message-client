import React, { Component } from 'react'
import { getUsers } from '../api.js'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      users: []
    }
  }

  onChange = event => {
    console.log(event.target.value)
    this.setState({
      user: event.target.value
    })
    this.props.onSelect(event.target.value)
  }

  componentDidMount() {
    getUsers().then(res => res.json())
      .then(resJson => this.setState({
        users: resJson.users
      }))
  }

  render() {
    return (
      <div className="buttons">
        <h6>Select a friend</h6>
        <select value={this.state.user} onChange={this.onChange}>
          <option></option>
          {this.state.users.map((user) =>
            <option key={user.id} value={user.id}>{user.email}</option>)}
        </select>
      </div>
    )
  }
}
export default UserList
