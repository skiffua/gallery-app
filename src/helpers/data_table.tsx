import React, {JSX, MouseEventHandler} from 'react';
import {CellProps, Column } from 'react-table';

import { User, UserToView } from '../api/type';
import {Action} from '@reduxjs/toolkit';

// export const usersColumns: (par: (arg: number) => () => Action) => Column[] = (deleteUserAction) => [
export const usersColumns: (par: (e: React.MouseEvent<HTMLButtonElement>, arg: number) => void)
    => Column[] = (deleteUserAction) => [
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Cell: ({ row }: CellProps<User>): JSX.Element => (
                // Use Cell to render an expander for each row.
                // We can use the getToggleRowExpandedProps prop-getter
                // to build the expander.
                <button className="bg-zinc-300 rounded-md text-xs w-[90px]
                hover:bg-zinc-600 hover:shadow-black hover:shadow-sm"
                    // how to handle
                        onClick={ (e: React.MouseEvent<HTMLButtonElement>) => deleteUserAction(e, row.values.id) }
                        value={ row.values.id }
                >
                    DELETE USER
                </button>
            ),
    },
];

export function buildTableData<T extends object>(data: UserToView[]): Record<string, string | number>[] {
    return data.map((user: UserToView) => {
        const {id, name, username, company} = user;

        return {id, name, username, company: company.name};
    });
}
