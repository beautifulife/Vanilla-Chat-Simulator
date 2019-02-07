import React, { Component, Fragment } from 'react';
import './Simulator.scss';
import {
  MESSAGE,
  CONNECT,
  DISCONNECT,
  UPDATE
} from '../actions/actionTypes';

export default class Simulator extends Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.lastMessage.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { timeLineData, userInfo, initSimulator } = this.props;

    const renderTimeLineData = () => {
      return timeLineData.map((appData, index) => {
        const { message, type, userId, previousDisplayName, displayName } = appData;
        const keyIndex = index;

        const renderData = () => {
          switch (type) {
          case MESSAGE:
            // action종류 = *, @, _,
            // let newText = message.text.replace(/\\n/, '<br />');

            return (
              <div className="Simulator__history__message">
                <span className="Simulator__history__message__name">{userInfo[userId].display_name}</span>
                <p className="Simulator__history__message__text"><span>&#x279C;</span>&nbsp;{message.text}</p>
              </div>
            );
          case CONNECT:
            return (
              <div className="Simulator__history__connect">
                <span className="Simulator__history__connect__message">
                  Awesome! User
                  <span>{userInfo[userId].display_name}</span>
                  is
                  <span>connect.</span>
                </span>
              </div>
            );
          case DISCONNECT:
            return (
              <div className="Simulator__history__disconnect">
                <span className="Simulator__history__disconnect__message">
                  Oh! User
                  <span>{userInfo[userId].display_name}</span>
                  is
                  <span>disconnect. TT</span>
                </span>
              </div>
            );
          case UPDATE:
            return (
              <div className="Simulator__history__update">
                <span>"{previousDisplayName}"</span>
                changes the name to
                <span>"{displayName}"</span>
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

    const renderUserOnlineInfo = () => {
      const userNow = Object.values(userInfo);

      const renderedUser = userNow.map((user) => {
        if (user.online) {
          return (
            <span key={user.id} className="Simulator__users__online">
              {user.display_name}
            </span>
          );
        }
      })
        .filter(item => item !== undefined);

      return renderedUser.length ? renderedUser : false;
    };

    return (
      <div className="Simulator">
        <div className="Simulator__header">
          vanilla_coding
        </div>
        <div className="Simulator__users">
          {renderUserOnlineInfo() || (<p className="Simulator__users__empty">No users</p>)}
        </div>
        <div className="Simulator__history">
          {renderTimeLineData()}
          <div
            className="Simulator__history__bottom"
            ref={(ref) => { this.lastMessage = ref; }}
          />
        </div>
        <div className="Simulator__input">
          <input type="button" value="This is just a simulator" onClick={() => initSimulator()} />
        </div>
      </div>
    );
  }
}
