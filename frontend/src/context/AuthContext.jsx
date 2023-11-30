import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { api, configJwt } from '/src/env/axios.js'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const getUser = (token) => {
        api.post('auth/me', null, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setUser(res.data)
            })
            .catch(() => {
                removeCookie('token', { path: '/' })
                navigate('/')
            })
    }

    const Login = (data) => {
        setErrors('')
        api.post('auth/login', data)
            .then((res) => {
                getUser(res.data.access_token)
                setCookie('token', res.data.access_token, { maxAge: 3627, path: '/' })
                res.data.user.username == 'admin' ? navigate('admin') : navigate('approver')
            }).catch(error => {
                setErrors(error.response.data)
            })
    }


    const Logout = () => {
        api.post('auth/logout', configJwt(cookies.token)).then(() => {
            setUser(null); removeCookie('token', { path: '/' }); navigate('/')
        }).catch(() => { setUser(null); removeCookie('token', { path: '/' }); navigate('/') });
    }

    const resetError = () => {
        setErrors('')
    }

    const isAuth = () => {
        if (cookies) {
            if (cookies.token) {
                getUser(cookies.token)
                return true
            } else {
                return false
            }
        }
    }

    useEffect(() => {
        isAuth()
    }, [])

    return (<AuthContext.Provider value={{ user, errors, isAuth, Login, Logout, resetError }}>{children}</AuthContext.Provider>)
}

export default function useAuthContext() {
    return useContext(AuthContext)
}
