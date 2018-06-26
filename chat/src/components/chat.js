import React, { Component } from 'react'
import ItemList from './itemlist';
import DisplayMessage from './displaymsg';

export default class Chat extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       users: []
    }
  }
  componentDidMount(){
    fetch('/users', {credentials: 'same-origin'})
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  componentDidUpdate(){
    if(this.state.users == false) {
      window.location = "http://localhost:3001/login"
    }
  }
  
  render() {
    return (
    <div id="frame">
    <ItemList user = {this.state.users[0]}/>
    <DisplayMessage/>
    </div>
    )
  }
}
