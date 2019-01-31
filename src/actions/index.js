let nextMessageId = 0;

export const addMessage = (text, display_name, id, user_name) => ({
  message: {
    id: nextMessageId++,
    text
  },
  type: 'message',
  user: {
    display_name,
    id,
    user_name
  }
});

export const deleteMessage = id => ({
  message: {
    id
  },
  type: 'delete'
});

export const connectUser = (display_name, id, user_name) => ({
  type: 'connect',
  user: {
    display_name,
    id,
    user_name
  }
});

export const disConnectUser = (display_name, id, user_name) => ({
  type: 'disconnect',
  user: {
    display_name,
    id,
    user_name
  }
});

export const updateUser = (display_name, id, user_name) => ({
  type: 'update',
  user: {
    display_name,
    id,
    user_name,
  }
});
