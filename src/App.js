import React, { Component } from 'react';
import './App.css';
import lstMessages from './messages.json';
import MessageList from './components/MessageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countStar: lstMessages.messages.filter(item => item.meta.isStarred)
        .length,
      messages: lstMessages.messages.filter(item => !item.meta.isTrashed),
      isShowTrash: false
    };
  }

  counthandler = isStarred => {
    this.setState(prevState => {
      return {
        countStar: isStarred ? prevState.countStar + 1 : prevState.countStar - 1
      };
    });
  };

  trashhandler = trashmessage => {
    let i = this.state.messages.indexOf(trashmessage);
    let messages = [...this.state.messages];
    let message = { ...messages[i] };
    message.meta.isTrashed = true;
    messages[i] = message;
    this.setState(prevState => {
      const list = prevState.messages.filter((item, j) => i !== j);
      return {
        messages: list
      };
    });
  };

  toggleTrash = () => {
    this.setState(prevState => {
      return {
        isShowTrash: !prevState.isShowTrash,
        messages: !prevState.isShowTrash
          ? lstMessages.messages.filter(item => item.meta.isTrashed)
          : lstMessages.messages.filter(item => !item.meta.isTrashed)
      };
    });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <a href="/">
            <img alt="Home" src="./logo.png" />
          </a>
          <a class="nav-view" href="/">
            MESSAGE VIEWER
          </a>
        </nav>
        <h3>Starred: {this.state.countStar}</h3>
        <button onClick={this.toggleTrash}>
          {this.state.isShowTrash
            ? 'Show Untrashed Messages'
            : 'Show Trashed Messages'}
        </button>
        <MessageList
          messages={this.state.messages}
          counthandler={this.counthandler}
          trashhandler={this.trashhandler}
        />
      </div>
    );
  }
}

export default App;
