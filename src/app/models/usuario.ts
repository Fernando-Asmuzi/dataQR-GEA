export interface Usuario {
    id: number;
    user_login: string;
    user_pass: string;
    user_nicename: string;
    user_email: string;
    display_name: string;
    admin: boolean;
}

export const emptyUsuario = (): Usuario => ({
    id: 0,
    user_login: '',
    user_pass: '',
    user_nicename: '',
    user_email: '',
    display_name: '',
    admin: false
});