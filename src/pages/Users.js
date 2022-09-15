import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useTable } from 'react-table';

import { fetchUsers } from '../store/actions';

import {buildTableData, usersColumns} from '../helpers/data_table';

function Users() {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users);
    const dataTable = React.useMemo(() => buildTableData(users), [users]);
    const tableInstance = useTable({ columns: usersColumns, data: dataTable });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div className="home_page">
            <table {...getTableProps()}>
                <thead>
                {// Loop over the header rows
                    headerGroups.map((headerGroup, key) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()} key={ key }>
                            {// Loop over the headers in each row
                                headerGroup.headers.map((column, key2) => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()} key={ key2 }>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map((row, key) => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()} key={ key }>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()} key={ key }>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
