import http from "@/request";
import {
  UserInfo,
  updatePwdParam,
  updateUserInfoParam,
} from "@/type/dashboard";
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
export const updateUserInfo = (params: updateUserInfoParam) => {
  return http({
    url: "/user/updateUserInfo",
    method: "PUT",
    params,
  });
};
