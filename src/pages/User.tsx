import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../store/store';
import { fetchUser } from '../store/actions';

function User() {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState({});
    const { id } = useParams();

    const getUserData = async (): Promise<void> => {
        const { payload } = await dispatch(fetchUser(+id));

        if (payload) {
            setUser(payload);
        }

        console.log('payload', payload);
    }

    useEffect( () => {
        if (id) {
            void getUserData();
        }
    }, []);

    return (
        <div className="users_page">
            USER INFO
        </div>
    );
}

export default User;
