import http from "@/request";
import { UserInfo } from "@/type/dashboard";
export const userLogin = () => {
  return http<UserInfo>({
    url: "/user/userInfo",
    method: "GET",
  });
};
