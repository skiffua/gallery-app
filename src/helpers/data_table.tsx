import React from 'react';
import { Column } from 'react-table';

import { UserToView } from '../api/type';

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
                hover:bg-zinc-600 hover:shadow-black hover:shadow-sm"
                    // how to handle
                    //onClick={}
            >
                DELETE USER
            </button>
        ),
    },
];

export function buildTableData(data: UserToView[]): any {
    return data.map((user: UserToView) => {
        const {id, name, username, company} = user;

        return {id, name, username, company: company.name};
    });
}
