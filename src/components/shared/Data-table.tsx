import React, { useEffect, useState } from 'react';
import {Column, Row, useTable} from 'react-table';

interface dataInterface<T extends object> {
    data: T[],
    columns: Column<T>[],
    clickRowHandler: (row: object) => void
}

function DataTable<T extends object>({ data, columns, clickRowHandler }: dataInterface<T>) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

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
                    rows.map((row: Row<T>, key: number) => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()} key={ key } onClick={() => clickRowHandler(row)}>
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
