export interface LoginParamter {
  username: string;
  password: string;
}
export interface RegisterParamter extends LoginParamter {
  phone: string;
}

export interface ForgetpwdParamter {
  phone: string;
  new_password: string;
  re_password: string;
}
