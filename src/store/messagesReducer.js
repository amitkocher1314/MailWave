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
      state.messages = action.payload;
      state.unreadCount = action.payload.filter(msg => !msg.read).length;
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
