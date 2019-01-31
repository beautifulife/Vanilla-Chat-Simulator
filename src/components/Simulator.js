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
    const { timeLineData, initSimulator } = this.props;

    const renderTimeLineData = () => {
      return timeLineData.map((appData, index) => {
        const { message, type, user } = appData;
        const keyIndex = index;

        const renderData = () => {
          switch (type) {
          case MESSAGE:
            // action종류 = *, @, _, \n, 
            let newText = message.text.replace(/\\n/, '<br />')

            return (
              <div className="Simulator__history__message">
                <span className="Simulator__history__message__name">{user.display_name}</span>
                <p className="Simulator__history__message__text">&#x279C;&nbsp;{newText}</p>
              </div>
            );
          case CONNECT:
            return (
              <div className="Simulator__history__connect">
                <span className="Simulator__history__connect__message">
                  Awesome! User
                  <span>{user.display_name}</span>
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
                  <span>{user.display_name}</span>
                  is
                  <span>disconnect. TT</span>
                </span>
              </div>
            );
          case UPDATE:
            return (
              <div className="Simulator__history__update">
                <span>"{user.previous_display_name}"</span>
                changes the name to
                <span>"{user.display_name}"</span>
              </div>
            );
          default:
            console.log(appData, type);

            return (
              <div>
                <span>!!!!!!!!wrong type occured!!!!!!!!</span>
              </div>
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
      <div className="Simulator">
        <div className="Simulator__header">
          vanilla_coding
        </div>
        <div className="Simulator__users">
          여기유저들
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
