import {
  MESSAGE,
  DELETE,
  CONNECT,
  DISCONNECT,
  UPDATE
} from '../actions/actionTypes';

const initialState = {
  messages: [],
  userInfo: {},
  messageStorage: {}
};

const messages = (state = initialState, action) => {
  const userInfo = state.userInfo;
  const messageStorage = state.messageStorage;

  if (action.user && !userInfo[action.user.id]) {
    userInfo[action.user.id] = {
      id: action.user.id,
      display_name: action.user.display_name,
      online: true
    };
  }

  if (action.message && !messageStorage[action.message.id]) {
    messageStorage[action.message.id] = {
      id: action.message.id,
      text: action.message.text
    };
  }

  switch (action.type) {
  case MESSAGE:
    return {
      messages: [
        ...state.messages,
        {
          userId: action.user.id,
          type: action.type,
          message: messageStorage[action.message.id]
        }
      ],
      userInfo,
      messageStorage
    };
  case DELETE:
    let messageIndex;

    for (let i = 0; i < state.messages.length; i++) {
      if (state.messages[i].message && action.message.id === state.messages[i].message.id) {
        messageIndex = i;

        break;
      }
    }

    return Object.assign({}, state, {
      messages: [
        ...state.messages.slice(0, messageIndex),
        ...state.messages.slice(messageIndex + 1)
      ]
    });
  case CONNECT:
    userInfo[action.user.id].online = true;

    return Object.assign({}, state, {
      messages: [
        ...state.messages,
        {
          userId: action.user.id,
          type: action.type
        }
      ]
    });
  case DISCONNECT:
    userInfo[action.user.id].online = false;

    return Object.assign({}, state, {
      messages: [
        ...state.messages,
        {
          userId: action.user.id,
          type: action.type
        }
      ]
    });
  case UPDATE:
    if (action.message) {
      messageStorage[action.message.id].text = action.message.text;

      return Object.assign({}, state);
    }

    if (action.user) {
      const previousDisplayName = userInfo[action.user.id].display_name;

      userInfo[action.user.id].display_name = action.user.display_name;

      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {
            type: action.type,
            previousDisplayName,
            displayName: action.user.display_name
          }
        ]
      });
    }

    break;
  default:
    return state;
  }
};

export default messages;
