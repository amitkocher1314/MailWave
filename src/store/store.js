import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messagesReducer from "./messagesReducer";
export const store = configureStore({
    reducer:{
        auth:authReducer,
        messages:messagesReducer,
    },
});
export default store;
