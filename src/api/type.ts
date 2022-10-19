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
    phone?: string;
    address?: Adress;
    email?: string;
    company: Company;
    website?: string;
}

export type UserToView = Pick<User, "id" | "name" | "username" | "company">;
