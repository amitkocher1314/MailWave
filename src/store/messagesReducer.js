import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  unreadCount: 0,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      const newMessages = action.payload;
      const existingIds = state.messages.map(msg => msg.id);
      const hasChanges = newMessages.some(msg => !existingIds.includes(msg.id)) || 
                         newMessages.length !== state.messages.length;
      if (hasChanges) {
        state.messages = newMessages;
        state.unreadCount = newMessages.filter(msg => !msg.read).length;
      }
    },
    markAsRead(state, action) {
      const messageId = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message && !message.read) {
        message.read = true;
        state.unreadCount -= 1;
      }
    },
  },
});

export const { setMessages, markAsRead } = messagesSlice.actions;
export default messagesSlice.reducer;
