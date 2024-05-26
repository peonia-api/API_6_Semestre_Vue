export interface Usuario {
    id: string;
    name: string;
    surname: string;
    email: string;
    function: string;
    permissionType: string;
    password: string
  }

export interface User {
    usuario: Usuario[];
}

export interface UsuarioPefil {
    id: string;
    name: string;
    surname: string;
    email: string;
    function: string;
}