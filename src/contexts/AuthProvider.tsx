import { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getUserInfo } from "@/apis/auth";
import { PATH } from "@/utils/constants";

export interface IUser {
  id: string
  name: string
  email: string
  role: string
  image: string
}

export interface Session {
  user: IUser
  access_token: string
  handleLogout: () => void;
}

export const AuthContext = createContext<Omit<Session, 'access_token'> | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const id = Cookies.get('id');
  const access_token = Cookies.get('access_token');

  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("access_token");
    setUserInfo(null);
    window.location.href = PATH.LOGIN
  }

  useEffect(() => {
    if (!id || !access_token) {
      handleLogout()
      return
    }
    const fetchUserInfo = async () => {
      const res = await getUserInfo(id!);
      if (res.data) {
        setUserInfo(res.data)
      }
      else if (res.error) {
        console.log(res)
        handleLogout()
      }
    }
    fetchUserInfo()
  }, [id])

  return (
    <AuthContext.Provider value={{ user: userInfo!, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );

};
