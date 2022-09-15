import { createAsyncThunk } from '@reduxjs/toolkit';

import { GLOBAL_VAR, ROUTES } from '../api/constants';

import httpServ from '../api/http';

const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        console.log('fetchUsers');

        const response = await httpServ.get(`${GLOBAL_VAR.BASE_URL}${ROUTES.USERS}`);

        return response.data;
    }
)

export {
    fetchUsers,
}
