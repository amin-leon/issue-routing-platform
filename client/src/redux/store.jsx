import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth/authSlice';
import issueSlice from './issue/issueSlice';
import feedbackSlice from './feedbacks/feeddbackSlice';


const savedAuthState = JSON.parse(sessionStorage.getItem('authState')) || {};

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        issue: issueSlice.reducer,
        feedbacks: feedbackSlice.reducer,

    },
    preloadedState: {
        auth: savedAuthState,
      },
})
export default store;