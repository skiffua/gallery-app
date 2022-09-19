import React from 'react';

import { UserToView } from '../api/type';
import {CellProps, Column, UseExpandedRowProps} from 'react-table';

export const usersColumns: Column[] = [
    {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the data
    },
    {
        Header: 'NAME',
        accessor: 'name',
    },
    {
        Header: 'USER NAME',
        accessor: 'username',
    },
    {
        Header: 'COMPANY',
        accessor: 'company',
    },
    {
        Header: 'Actions',
        accessor: 'action',
        Cell: ({ row }: any) => (
            // Use Cell to render an expander for each row.
            // We can use the getToggleRowExpandedProps prop-getter
            // to build the expander.
            <button className="bg-zinc-300 rounded-md text-xs w-[90px]
                hover:bg-zinc-600 hover:shadow-black hover:shadow-sm">
                DELETE USER
            </button>
        ),
    },
];

export function buildTableData(data: UserToView[]): any {
    return data.map((user: UserToView) => {
        const { id, name, username, company } = user;

        return { id, name, username, company: company.name };
    });

 // return [
 //     {
 //         col1: 'Hello',
 //         col2: 'World',
 //     },
 //     {
 //         col1: 'react-table',
 //         col2: 'rocks',
 //     },
 //     {
 //         col1: 'whatever',
 //         col2: 'you want',
 //     },
 // ]
}
