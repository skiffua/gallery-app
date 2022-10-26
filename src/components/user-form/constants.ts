import { User } from '../../api/type';

export const defaultUserForm: User = {
    id: NaN,
    name: '',
    username: '',
    phone: '',
    address: {
        street: '',
        suite: '',
        city: '',
    },
    email: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: '',
    },
    website: '',
}
