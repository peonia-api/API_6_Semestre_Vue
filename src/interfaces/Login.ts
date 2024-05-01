export interface UsuarioLogin {
    id: string;
    password: string;
    email: string;
  }
  
  export interface UserLogin {
    usuario: UsuarioLogin[];
    token: string;
  }