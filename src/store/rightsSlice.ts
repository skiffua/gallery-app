import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

import { RIGHTS } from './constants';

export interface UsersState {
    rights: number[]
}

const initialState: UsersState = {
    rights: [ ...Object.keys(RIGHTS).map((r: string) => +r) ],
}

export const rightsSlice = createSlice({
    name: 'rights',
    initialState,
    reducers: {
        switchRight: (state, action: PayloadAction<string>) => {
            const indexRight: number = state.rights.findIndex(el => el === +action.payload);

            if (indexRight !== -1) {
                state.rights.splice(indexRight, 1);
            } else {
                state.rights.push(+action.payload);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { switchRight } = rightsSlice.actions

export const rights = (state: UsersState) => state.rights;

export default rightsSlice.reducer
