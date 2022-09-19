import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { usersColumns } from '../../helpers/data_table';

function DataTable({ dataTable } : { dataTable: any }) {
    const tableInstance = useTable({ columns: usersColumns, data: dataTable });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    const [isComponentVisible, setComponentVisible] = useState(false);

    useEffect(() => {
        setComponentVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-[3000ms] ${isComponentVisible ? 'opacity-100' : 'opacity-0 '}`}>
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
                                    row.cells.map((cell, key2) => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()} key={ key2 }>
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

export default DataTable;
