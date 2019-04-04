import React from 'react';
import Message from './Message';

function MessageList(props) {
  return (
    <ul className="card">
      {props.messages.length > 0 &&
        props.messages.map(c => (
          <Message
            key={c.id}
            message={c}
            counthandler={props.counthandler}
            trashhandler={props.trashhandler}
          />
        ))}
    </ul>
  );
}

export default MessageList;
