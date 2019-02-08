import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';
import {
  MESSAGE,
  CONNECT,
  DISCONNECT,
  UPDATE
} from '../actions/actionTypes';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.lastMessage = React.createRef();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.lastMessage.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { timeLineData, userInfo } = this.props;

    const renderTimeLineData = () => {
      return timeLineData.map((data, index) => {
        const { message, type, userId, previousDisplayName, displayName } = data;
        const keyIndex = data.userId + index.toString();

        const renderData = () => {
          switch (type) {
          case MESSAGE:
            const emojis = {
              ':sob:': '😭',
              ':)': '😀',
              ':facepalm:': '‍‍🤦‍',
              ':scream_cat:': '🙀',
              ':ghost:': '👻'
            };
            let newText = message.text;

            for (let text in emojis) {
              if (emojis.hasOwnProperty(text)) {
                newText = newText.replace(text, emojis[text]);
              }
            }

            if (/(\*)/.exec(newText)) {
              newText = (
                <span>
                  {
                    newText.split('*').map((chunk, index, array) => {
                      const textKeyIndex = chunk + index.toString();

                      if (index % 2 === 1 || index === array.length - 1) {
                        return <span key={textKeyIndex}>{chunk}</span>;
                      }

                      if (index % 2 === 1) {
                        return <b key={textKeyIndex}>{chunk}</b>;
                      }
                    })
                  }
                </span>
              );
            } else if (/^\_/.exec(newText)) {
              newText = (
                <span>
                  {
                    newText.split('_').map((chunk, index, array) => {
                      const textKeyIndex = chunk + index.toString();

                      if (index % 2 === 1 || index === array.length - 1) {
                        return <span key={textKeyIndex}>{chunk}</span>;
                      }

                      if (index % 2 === 1) {
                        return <i key={textKeyIndex}>{chunk}</i>;
                      }
                    })
                  }
                </span>
              );
            }

            return (
              <div className="Chat__message">
                <span className="Chat__message__name">{userInfo[userId].display_name}</span>
                <p className="Chat__message__text">
                  <span className="Chat__message__text__arrow">&#x279C;&nbsp;</span>
                  {newText}
                </p>
              </div>
            );

          case CONNECT:
            return (
              <div className="Chat__connect">
                <span className="Chat__connect__message">
                  Awesome! User
                  <span>{userInfo[userId].display_name}</span>
                  is
                  <span>connect.</span>
                </span>
              </div>
            );

          case DISCONNECT:
            return (
              <div className="Chat__disconnect">
                <span className="Chat__disconnect__message">
                  Oh! User
                  <span>{userInfo[userId].display_name}</span>
                  is
                  <span>disconnect. TT</span>
                </span>
              </div>
            );

          case UPDATE:
            return (
              <div className="Chat__update">
                <span>&quot;{previousDisplayName}&quot;</span>
                changes the name to
                <span>&quot;{displayName}&quot;</span>
              </div>
            );

          default:
            console.error('wrong type', type, 'is occured');

            return (
              <span />
            );
          }
        };

        return (
          <Fragment key={keyIndex}>
            {renderData()}
          </Fragment>
        );
      });
    };

    return (
      <div className="Chat">
        {renderTimeLineData()}
        <div className="Chat__bottom" ref={this.lastMessage} />
      </div>
    );
  }
}

Chat.propTypes = {
  timeLineData: PropTypes.instanceOf(Array).isRequired,
  userInfo: PropTypes.instanceOf(Object).isRequired,
};
