import React, { Component } from 'react'
import io from "socket.io-client";

export default class ChatBox extends Component {
    constructor(props) {
      super(props)
      this.state = {
         value: ''
      }
      this.trackChanges = this.trackChanges.bind(this);
      this.keyPress = this.keyPress.bind(this);
      this.socket = io('http://localhost:3001');
    }

    trackChanges(event) {
        this.setState({value: event.target.value});
    }

    keyPress(e){
        if(e.keyCode == 13 && this.state.value != ''){
            this.socket.emit('SEND_MESSAGE', {
                message:  {message: this.state.value}  
            })
            this.setState({value: ''});
        }
    }
    
  render() {
    return (
    <div class="message-input">
        <div class="wrap">
        <input type="text" value={this.state.value} onKeyDown={this.keyPress} onChange={this.trackChanges} placeholder="Write your message..." />
        <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
        <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
    </div>
    )
  }
}
