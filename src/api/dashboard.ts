import http from "@/request";
export const userLogin = () => {
    return http({
      url: "/user/userInfo",
      method: "GET",
    });
  };