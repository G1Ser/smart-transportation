import http from "@/request";
import type {
  LoginParamter,
  RegisterParamter,
  ForgetpwdParamter,
} from "@/type/login";

export const userLogin = (params: LoginParamter) => {
  return http({
    url: "/user/login",
    method: "POST",
    params,
  });
};

export const userRegister = (data: RegisterParamter) => {
  return http({
    url: "/user/register",
    method: "POST",
    data,
  });
};

export const forgetPwd = (data: ForgetpwdParamter) => {
  return http({
    url: "/user/forgetPwd",
    method: "PATCH",
    data,
  });
};
