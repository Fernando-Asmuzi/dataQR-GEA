export interface Usuario {
    id: number;
    user_login: string;
    user_email: string;
    display_name: string;
}

export const emptyUsuario = (): Usuario => ({
    id: 0,
    user_login: '',
    user_email: '',
    display_name: '',
});