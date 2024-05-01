export interface Usuario {
    id: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    function: string;
    authorizations: Authorization[];
}

export interface Authorization {
    id: number;
    name: string;
}

export interface User {
    usuario: Usuario[];
}
