import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../store/store';
import { fetchUser } from '../store/actions';
import { FORM_MODE, FORM_MODE_ENUM } from './types';
import { User } from '../api/type';

import './userPage.scss';
import UserForm from '../components/user-form/User-form';

function UserPage({ mode = FORM_MODE_ENUM.PREVIEW}: FORM_MODE) {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<Record<'id', string>>();
    const [user, setUser] = useState<User>({
        id: NaN,
        name: '',
        username: '',
        phone: '',
        address: {
            street: '',
            suite: '',
            city: '',
        },
        email: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: '',
        },
        website: '',
    });

    const getUserData = async (): Promise<void> => {
        // TODO problem with interface
        const { payload }: { payload: any } = await dispatch(fetchUser(+id));

        if (payload) {
            const {
                id,
                name,
                username,
                phone,
                address,
                email,
                company,
                website,
            } = payload;

            setUser({
                id,
                name,
                username,
                phone,
                address,
                email,
                company,
                website,
            });
        }
    }

    useEffect( () => {
        if (id) {
            void getUserData();
        }
    }, []);

    return (
        <div className="user-page flex-grow">
            { !!user.id && <UserForm
                mode={mode}
                userData={user}
            /> }
        </div>
    );
}

export default UserPage;
