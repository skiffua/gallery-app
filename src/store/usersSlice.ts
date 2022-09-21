import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

import {fetchUsers} from './actions';
import { User } from '../api/type';

export interface UsersState {
    users: User[]
}

const initialState: UsersState = {
    users: [],
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUser: (state, action: PayloadAction<number>) => {
            const indexUserToDel: number = state.users.findIndex(el => el.id === action.payload);

            if (indexUserToDel !== -1) {
                state.users.splice(indexUserToDel, 1);
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // Add user to the state array

            // const newUsers = action.payload.filter((newUser: Record<string, any>) => {
            //     return !state.users.some((user: Record<string, any>) => user.id === newUser.id);
            // })

            // state.users.push(...newUsers);
            state.users = action.payload;
        })
    },
})

console.log('usersSlice', usersSlice);

// Action creators are generated for each case reducer function
export const { deleteUser } = usersSlice.actions

export const users = (state: UsersState) => state.users;

export default usersSlice.reducer
