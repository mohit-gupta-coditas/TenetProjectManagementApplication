import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface AuthProviderType extends PropsWithChildren{}

type GlobalRole="admin"|"superAdmin"|"member"

interface User{
  accessToken:string;
  globalRole:GlobalRole;
  refreshToken:string;
  email:string;
}

interface AuthContextType{
  user: User | null;
  login:(user:any)=>void;
  logout:()=>void
}

const AuthContext=createContext<AuthContextType|null>(null)

export const AuthProvider=({children}:AuthProviderType)=>{
  const [user,setUser]=useState<User|null>(null)
  const login=(currentUser:User)=>{
    localStorage.setItem("access_token",currentUser.accessToken)
    localStorage.setItem("currentRole",currentUser.globalRole)
    setUser(currentUser)
  }
  const logout=()=>{
    localStorage.removeItem("access_token")
    localStorage.removeItem("currentRole")
    setUser(null)
  }
  return(
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(){
  const context=useContext(AuthContext)
  if(!context){
    throw new Error("FAILED")
  }
  return context
}
