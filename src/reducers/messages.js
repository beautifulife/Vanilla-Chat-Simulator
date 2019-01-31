import {
  MESSAGE,
  DELETE,
  CONNECT,
  DISCONNECT,
  UPDATE
} from '../actions/actionTypes';

const users = {};

const messages = (state = [], action) => {
  if (action.user && !users[action.user.id]) {
    users[action.user.id] = action.user;
  }

  switch (action.type) {
  case MESSAGE:
    return [
      ...state,
      {
        message: {
          id: action.message.id,
          text: action.message.text
        },
        type: action.type,
        user: {
          display_name: action.user.display_name,
          id: action.user.id,
          user_name: action.user.user_name,
        }
      }
    ];
  case DELETE:
    let messageIndex;

    for (let i = 0; i < state.length; i++) {
      if (state[i].message && action.message.id === state[i].message.id) {
        messageIndex = i;

        break;
      }
    }

    return [
      ...state.slice(0, messageIndex),
      ...state.slice(messageIndex + 1)
    ];
  case CONNECT:
    return [
      ...state,
      {
        type: action.type,
        user: {
          display_name: action.user.display_name,
          id: action.user.id,
          user_name: action.user.user_name
        }
      }
    ];
  case DISCONNECT:
    return [
      ...state,
      {
        type: action.type,
        user: {
          display_name: action.user.display_name,
          id: action.user.id,
          user_name: action.user.user_name
        }
      }
    ];
  case UPDATE:
    if (action.message) {
      const copiedState = state.slice();

      for (let i = 0; i < copiedState.length; i++) {
        if (copiedState[i].message && action.message.id === copiedState[i].message.id) {
          copiedState[i].message = {
            id: action.message.id,
            text: action.message.text
          };
        }
      }

      return copiedState;
    }

    if (action.user) {
      const copiedState = state.slice();
      let previousDisplayName;

      for (let i = 0; i < copiedState.length; i++) {
        if (copiedState[i].user && action.user.id === copiedState[i].user.id) {
          previousDisplayName = copiedState[i].user.display_name;
          copiedState[i].user = {
            display_name: action.user.display_name,
            id: action.user.id,
            user_name: action.user.user_name
          };
        }
      }

      return [
        ...copiedState,
        {
          type: action.type,
          user: {
            previous_display_name: previousDisplayName,
            display_name: action.user.display_name
          }
        }
      ];
    }

    break;
  default:
    return state;
  }
};

export default messages;
