export declare const login: (data: {
    email: string;
    password: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const register: (data: {
    email: string;
    password: string;
    name?: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const resendVerificationEmail: (data: {
    email: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getProfile: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updateProfile: (data: {
    name: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const changePassword: (data: {
    currentPassword: string;
    newPassword: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const deleteAccount: (data: {
    password: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
