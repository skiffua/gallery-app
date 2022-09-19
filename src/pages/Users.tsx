import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import { fetchUsers } from '../store/actions';

import { User } from '../api/type';
import { AppDispatch, RootState } from '../store/store';

import { buildTableData, usersColumns } from '../helpers/data_table';
import DataTable from '../components/shared/Data-table';

function Users() {
    const dispatch = useDispatch<AppDispatch>();
    const { users } = useSelector<RootState, { users: User[] }>((state) => state.users);
    const dataTable = React.useMemo(() => buildTableData(users), [users]);

    useEffect(() => {
        // delay fetching
        const timeOutId = setTimeout(() => {
            dispatch(fetchUsers());
        }, Math.floor(Math.random() * 4000));

        return () => { clearTimeout(timeOutId); }
    }, []);

    return (
        <div className="home_page bg-midnight flex-grow flex justify-center">
            { dataTable.length ? <DataTable dataTable={ dataTable } usersColumns={ usersColumns } /> :
                <button type="button" className="inline-flex items-center" disabled>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
                            5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Завантаження...
                </button>}
        </div>
    );
}

export default Users;
