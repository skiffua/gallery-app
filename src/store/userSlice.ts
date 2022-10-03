import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from './actions';
import { User } from '../api/type';

export interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    },
})

export default usersSlice.reducer
