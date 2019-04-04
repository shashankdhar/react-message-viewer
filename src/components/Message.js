import React, { Component } from 'react';

function StarButton(props) {
  return (
    <button
      title="click to un-star it"
      className="btn-star"
      onClick={props.handleClick}
    >
      Starred!
    </button>
  );
}

function UnStarButton(props) {
  return (
    <button title="click to star it" onClick={props.handleClick}>
      Star Message!
    </button>
  );
}

function ConditionalButton(props) {
  const isStarred = props.isStarred;
  if (isStarred) {
    return <StarButton handleClick={props.handleClick} />;
  }
  return <UnStarButton handleClick={props.handleClick} />;
}

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarred: props.message.meta.isStarred,
      isTrashed: props.message.meta.isTrashed
    };
  }

  handleTrashEvent = () => {
    this.setState(prevState => {
      this.props.trashhandler(this.props.message);
      return { isTrashed: true };
    });
  };

  handleStarEvent = () => {
    this.setState(prevState => {
      this.props.counthandler(!prevState.isStarred);
      return { isStarred: !prevState.isStarred };
    });
  };

  render() {
    const message = this.props.message;
    return (
      <li className="card__item">
        <section className="left_section">
          <img className="" src={message.avatar} alt={message.handle} />
          <small className="card__item__name js-ripple">{message.handle}</small>
        </section>
        <section className="center_section">
          <div>
            <small>{message.source}</small>
            <small> | {message.timestamp}</small>
          </div>
          <p className="content">{message.content}</p>
        </section>
        <section className="right_section">
          {!this.state.isTrashed && (
            <button className="btn-trash" onClick={this.handleTrashEvent}>
              Trash
            </button>
          )}
          <ConditionalButton
            isStarred={this.state.isStarred}
            handleClick={this.handleStarEvent}
          />
        </section>
      </li>
    );
  }
}

export default Message;
