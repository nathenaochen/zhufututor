const baseUrl: string = window.location.origin;
export const getUserUrl:string = `${baseUrl}/apiService/user/getuser`;
export const registerUrl:string = `${baseUrl}/apiService/user/register`;
export const gettokenUrl:string = `${baseUrl}/apiService/auth/get_token`;
export const validatetokenUrl:string = `${baseUrl}/apiService/auth/validate_token`;