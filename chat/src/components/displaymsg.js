import React, { Component } from 'react'
import ChatBox from './chatbox';
import io from 'socket.io-client'

export default class DisplayMessage extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
		 messages: [],
		 users: []
	  }
	  this.socket = io('http://localhost:3001');
	  this.socket.on('RECEIVE_MESSAGE', data => {
		if(typeof this.state.messages == 'undefined'){
			this.setState({messages: [data.message]})
		} 
		else {
			this.setState({messages: [...this.state.messages, data.message]})
		}
	});
	this.scrollToBottom = this.scrollToBottom.bind(this)
	}
	scrollToBottom() {
        const {thing} = this.refs;
        thing.scrollTop = thing.scrollHeight - thing.clientHeight;
	}

	componentDidMount(){
    fetch('/users', {credentials: 'same-origin'})
      .then(res => res.json())
      .then(users => this.setState({ users }));
	}
	
  render() {
    return (
    <div class="content">
		<div class="contact-profile">
			<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
			<p>{typeof this.state.users[0] != "undefined" ? this.state.users[0].username : null}</p>
			<div class="social-media">
				<i class="fa fa-facebook" aria-hidden="true"></i>
				<i class="fa fa-twitter" aria-hidden="true"></i>
				 <i class="fa fa-instagram" aria-hidden="true"></i>
			</div>
		</div>
		<div ref={`thing`} class="messages">
			<ul>
				<li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
				</li>
				<li class="replies">
					<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
					<p>When you're backed against the wall, break the god damn thing down.</p>
				</li>
				{typeof this.state.users != "undefined" ? this.state.messages.map((message) => {
				return message.from == this.state.users[0].username ? 
				<li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>{message.message}</p>
				</li>
				:
				<li class="replies">
					<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
					<p>{message.message}</p>
			  </li>
				}): null}
			</ul>
		</div>
		<ChatBox users = {this.state.users}/>
	</div>
    )
  }
}
