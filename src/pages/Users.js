import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import { fetchUsers } from '../store/actions';

function Users() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        console.log('users***', users);
    }, [users]);

    return (
        <div className="home_page">
            USERS PAGE
            {users ? users.map(el => el.id) : null}
        </div>
    );
}

export default Users;
