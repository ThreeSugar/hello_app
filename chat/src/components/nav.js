import React, { Component } from 'react'

export default class NavBar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        users: []
      }
    }
    componentDidMount() {
      fetch('/users', {credentials: 'same-origin'})
        .then(res => res.json())
        .then(users => this.setState({ users }));
    }
    
  render() {
    const users = this.state.users;
    return (
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
        <div class="navbar-header">
        <a class="navbar-brand" href="#">WebSiteName</a>
        </div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li>
            {users == false  ? <a href="http://localhost:3001">Login</a>
            : <a href="http://localhost:3001">{this.state.users[0].username}</a>}
            </li>
            <li>
            {users == false  ? null
            : <a href="http://localhost:3001/logout">Logout</a>}
            </li>
        </ul>
        </div>
    </nav>
    )
  }
}
