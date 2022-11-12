import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import {AppDispatch, RootState} from '../store/store';
import { fetchUser } from '../store/actions';
import { FORM_MODE, FORM_MODE_ENUM } from './types';
import { User } from '../api/type';

import './userPage.scss';
import UserForm from '../components/user-form/User-form';

function UserPage({ mode = FORM_MODE_ENUM.PREVIEW}: FORM_MODE) {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<Record<'id', string>>();
    const { user } = useSelector<RootState, { user: User }>((state) => state.user);

    useEffect( () => {
        if (id) {
            dispatch(fetchUser(+id));
        }
    }, []);

    return (
        <div className="user-page flex-grow">
            { !!user && <UserForm
                mode={mode}
                userData={user}
            /> }
        </div>
    );
}

export default UserPage;
