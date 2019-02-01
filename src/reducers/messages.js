import {
  MESSAGE,
  DELETE,
  CONNECT,
  DISCONNECT,
  UPDATE
} from '../actions/actionTypes';

const usersStorage = {};
const messagesStorage = {};

const messages = (state = [], action) => {
  if (action.user && !usersStorage[action.user.id]) {
    usersStorage[action.user.id] = action.user;
  }

  if (action.message && !messagesStorage[action.message.id]) {
    messagesStorage[action.message.id] = action.message;
  }

  switch (action.type) {
  case MESSAGE:
    return [
      ...state,
      {
        message: messagesStorage[action.message.id],
        type: action.type,
        user: usersStorage[action.user.id]
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
        user: usersStorage[action.user.id]
      }
    ];
  case DISCONNECT:
    return [
      ...state,
      {
        type: action.type,
        user: usersStorage[action.user.id]
      }
    ];
  case UPDATE:
    if (action.message) {
      messagesStorage[action.message.id].text = action.message.text;

      return [
        ...state
      ];
    }

    if (action.user) {
      const previousDisplayName = usersStorage[action.user.id].display_name;

      usersStorage[action.user.id].display_name = action.user.display_name;
      usersStorage[action.user.id].user_name = action.user.user_name;

      return [
        ...state,
        {
          type: action.type,
          user: {
            previous_display_name: previousDisplayName,
            display_name: usersStorage[action.user.id].display_name
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
