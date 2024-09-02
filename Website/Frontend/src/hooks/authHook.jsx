import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../slices/userSlice'

export function useLogin() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    async function sendLogin({email, password}) {
        return new Promise((resolve, reject) => {
            setLoading(true);
            // request to backend
            setTimeout(() => {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IkFuaXMgUk9VQU5FIiwiaWQiOiIxMjM0NTY3ODkiLCJpYXQiOjE3MjQxNzM2NDN9.qXC0D7F9GR960vdklvorIa0cOT414oRX3K8w8uVRsy8";
                dispatch(login(token));
                resolve({
                    status: 'success'
                })
            }, 2000)
        });
    }

    return {
        loading,
        sendLogin
    }
}