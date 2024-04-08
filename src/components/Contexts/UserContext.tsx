'use client';
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { useNavigate, redirect } from "react-router-dom";

type userInfo = {
    id?: string,
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    token?: string;
}

type PostData = {
    id?: string;
    userId: string;
    postedAt: string;
    title: string;
    text: string;
}

type MyContextProps = {
 user: userInfo;
 isAuthenticated: boolean;
 Login: (data :userInfo) => void;
 Logout: ()=> void;
 editPost: (data: PostData)=> void;
 deletePost: (id: string)=> void;
 createPost: (data: PostData) => void;
}


type MyProviderProps = {
    children: ReactNode;
};
export const AuthContext = createContext({} as MyContextProps);

export default function AuthContextProvider({children}: MyProviderProps){
    const [user, setUser] = useState({});    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        GetCookies();
    },[isAuthenticated])


    async function Login(data: userInfo){
        fetch("http://localhost:3000/users")
        .then( res => {
            if(!res.ok){
                throw new Error("Something goes wrong!")
            }
            return res.json();
        })
        .then( (users) => {
            users.map( (user:userInfo) => {
                if(data.email === user.email){
                    if(data.password === user.password){
                        setCookie(undefined, "@frontend-cookie", user.id as string)
                        setUser(user);
                        setIsAuthenticated(true);
                    }else{
                        alert("Wrong Password!");
                    }
                }
            })
        }     

        )
    }
    function Logout(){  
        setUser('');
        setIsAuthenticated(false);
        destroyCookie(undefined, "@frontend-cookie");
        redirect('/login'); 
    }
    async function GetCookies(){        
        const { '@frontend-cookie': id } = parseCookies();
        if(id){
            fetch(`http://localhost:3000/users/${id}`)
            .then(
                res => res.json()
            )
            .then(
                user => {
                    const data = {
                        email: user.email,
                        password: user.password
                    }
                    Login(data);
                }
            )
        }
    }
    function editPost(data: PostData){
        fetch(`http://localhost:3000/posts/${data.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(
                    data
                )
            }
        )
        .then( res => {
            if(!res.ok){
                throw new Error("Something goes wrong!")
            }
            return res.json();
        })        
        navigate('/profile');
    }
    async function deletePost(id: string){
        console.log(id);
        const myObj = {id: id}
        await fetch(`http://localhost:3000/posts/${id}`,
        {
            method: 'DELETE',
            body: null
        }
    )
    .then( res => {
        if(!res.ok){
            throw new Error("Something goes wrong!");
        }
        return res.json();
    })
    navigate('/profile');
    }

    function createPost(data : PostData){
        fetch("http://localhost:3000/posts",
            {
                method: 'POST',
                body: JSON.stringify(
                    data
                )
            }
        )
        .then( res => {
            if(!res.ok){
                throw new Error("Something goes wrong!")
            }
            return res.json();
        })        
        navigate('/profile');
    }
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, Login , Logout, editPost, deletePost, createPost}}>
            {children}
        </AuthContext.Provider>
    )
}