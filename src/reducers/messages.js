import {
  MESSAGE,
  DELETE,
  CONNECT,
  DISCONNECT,
  UPDATE
} from '../actions/actionTypes';

const initialState = {
  messages: [],
  usersById: {},
  messagesById: {}
};

const messages = (state = initialState, action) => {
  const { usersById, messagesById } = state;

  if (action.user && !usersById[action.user.id]) {
    usersById[action.user.id] = {
      id: action.user.id,
      display_name: action.user.display_name,
      online: true
    };
  }

  if (action.message && !messagesById[action.message.id]) {
    messagesById[action.message.id] = {
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
          message: messagesById[action.message.id]
        }
      ],
      usersById,
      messagesById
    };
  case DELETE:
    let messageIndex;

    for (let i = 0; i < state.messages.length; i++) {
      if (state.messages[i].message && action.message.id === state.messages[i].message.id) {
        messageIndex = i;

        break;
      }
    }

    delete messagesById[action.message.id];

    return Object.assign({}, state, {
      messages: [
        ...state.messages.slice(0, messageIndex),
        ...state.messages.slice(messageIndex + 1)
      ]
    });
  case CONNECT:
    usersById[action.user.id].online = true;

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
    usersById[action.user.id].online = false;

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
      messagesById[action.message.id].text = action.message.text;

      return Object.assign({}, state);
    }

    if (action.user) {
      const previousDisplayName = usersById[action.user.id].display_name;

      usersById[action.user.id].display_name = action.user.display_name;

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
