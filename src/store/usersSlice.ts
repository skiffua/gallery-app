import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

import {fetchUsers} from './actions';

export interface UsersState {
    users: Record<any, any>[]
}

const initialState: UsersState = {
    users: [],
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Record<any, any>[]>) => {
            state.users = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // Add user to the state array

            const newUsers = action.payload.filter((newUser: Record<string, any>) => {
                return !state.users.some((user: Record<string, any>) => user.id === newUser.id);
            })

            console.log('newUsers', newUsers);

            state.users.push(...newUsers);
        })
    },
})

console.log('usersSlice', usersSlice);

// Action creators are generated for each case reducer function
export const { add } = usersSlice.actions

export const users = (state: UsersState) => state.users;

export default usersSlice.reducer
