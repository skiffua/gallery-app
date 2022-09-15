import { createAsyncThunk } from '@reduxjs/toolkit';

import { GLOBAL_VAR, ROUTES } from '../api/constants';

import { User } from '../api/type';

import httpServ from '../api/http';

const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (): Promise<User[]> => {
        console.log('fetchUsers');

        const response: { data: User[] } = await httpServ.get(`${GLOBAL_VAR.BASE_URL}${ROUTES.USERS}`);

        return response.data;
    }
)

export {
    fetchUsers,
}
