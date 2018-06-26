import React, { Component } from 'react'
import ItemList from './itemlist';
import DisplayMessage from './displaymsg';

export default class Chat extends Component {
  render() {
    return (
    <div id="frame">
    <ItemList/>
    <DisplayMessage/>
    </div>
    )
  }
}
