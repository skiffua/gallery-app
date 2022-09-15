import { UserToView } from '../api/type';

export const usersColumns = [
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
