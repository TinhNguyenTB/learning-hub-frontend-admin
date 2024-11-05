import { createContext, ReactNode, useState, useEffect } from "react";
import { getUserInfo } from "@/apis/auth";
import { PATH } from "@/utils/constants";
import { getCookies, removeCookies } from "@/utils/cookies";

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

  const { id, access_token } = getCookies()

  const handleLogout = () => {
    removeCookies()
    setUserInfo(null);
    window.location.href = PATH.LOGIN
  }

  useEffect(() => {
    if (!id || !access_token) {
      handleLogout()
      return
    }
    const fetchUserInfo = async () => {
      const res = await getUserInfo(id!, access_token);
      if (res.data) {
        setUserInfo(res.data)
      }
      else if (res.error) {
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
