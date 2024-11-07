import http from "@/request";
import { UserInfo, updatePwdParam } from "@/type/dashboard";
export const userLogin = () => {
  return http<UserInfo>({
    url: "/user/userInfo",
    method: "GET",
  });
};
export const updatePwd = (data: updatePwdParam) => {
  return http({
    url: "/user/updatePwd",
    method: "PATCH",
    data,
  });
};
