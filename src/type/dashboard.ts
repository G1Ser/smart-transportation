export interface UserInfo {
  authority: number;
  avatar: string;
  id: number;
  nickname: string;
  username: string;
}
export interface updatePwdParam {
  old_password: string;
  new_password: string;
  re_password: string;
}
export interface asideData {
  id: number;
  icon: string;
  name: string;
  path: string;
  index: number;
  status: number;
  type: number;
  children: asideData[] | [];
}
