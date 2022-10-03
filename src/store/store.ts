import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import userReducer from './userSlice';
import rightsReducer from './rightsSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        rights: rightsReducer,
        user: userReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
