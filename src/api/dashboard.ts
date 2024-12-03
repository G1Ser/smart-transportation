import http from "@/request";
import {
  UserInfo,
  updatePwdParam,
  updateUserInfoParam,
  uploadFileParam,
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
export const uploadFile = (params: uploadFileParam) => {
  const formData = new FormData();
  formData.append("folderName", params.folderName);
  formData.append("file", params.file, "avatar.png");
  return http({
    url: "/files/uploadFile",
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
