interface Company {
    name: string;
    catchPhrase?: string;
    bs?: string;
}

interface Adress {
    street: string;
    suite: string;
    city: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    address?: Adress;
    email?: string;
    company: Company;
}

export type UserToView = Pick<User, "id" | "name" | "username" | "company">;
