import React, { Component } from 'react'
import ChatBox from './chatbox';
import io from 'socket.io-client'

export default class DisplayMessage extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
		 messages: []
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
	
  render() {
    return (
    <div ref={`thing`} class="content">
		<div class="contact-profile">
			<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
			<p>Harvey Specter</p>
			<div class="social-media">
				<i class="fa fa-facebook" aria-hidden="true"></i>
				<i class="fa fa-twitter" aria-hidden="true"></i>
				 <i class="fa fa-instagram" aria-hidden="true"></i>
			</div>
		</div>
		<div class="messages">
			<ul>
				<li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
				</li>
				<li class="replies">
					<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
					<p>When you're backed against the wall, break the god damn thing down.</p>
				</li>
				{this.state.messages.map((message) => {
				return <li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>{message.message}</p>
				</li>
				})}
			</ul>
		</div>
		<ChatBox/>
	</div>
    )
  }
}
