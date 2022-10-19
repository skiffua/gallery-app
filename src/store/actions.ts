import {AsyncThunk, createAsyncThunk} from '@reduxjs/toolkit';

import { GLOBAL_VAR, ROUTES } from '../api/constants';

import { User } from '../api/type';

import httpServ from '../api/http';

const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (): Promise<User[]> => {
        const response: { data: User[] } = await httpServ.get(`${GLOBAL_VAR.BASE_URL}${ROUTES.USERS}`);

        return response.data;
    }
)

const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (userId: number): Promise<User | null> => {
        const response: { data: User } = await httpServ.get(`${GLOBAL_VAR.BASE_URL}${ROUTES.USERS}/${userId}`);
        const { id } = response.data;

        if (id) {
            return response.data;
        } else {
            return null;
        }
    }
)

export {
    fetchUsers,
    fetchUser,
}
