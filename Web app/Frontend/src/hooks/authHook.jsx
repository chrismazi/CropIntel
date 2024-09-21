import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../slices/userSlice';
import axios from 'redaxios';
import { config } from "../config";

export function useLogin() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    async function sendLogin({ email, password }) {
        return new Promise(async (resolve, reject) => {
            setLoading(true);
            let status = "";
            try {
                const res = await axios.post(`${config.host}/login`, {
                    email,
                    password
                }, {
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                });
                
                console.log(res.data);
                const token = res.data.access_token;
                dispatch(login(token));
                status = "success";
            } catch (err) {
                console.log(err);
                status = "error";
            } finally {
                setLoading(false);
                resolve({
                    status
                });
            }
        });
    }

    return {
        loading,
        sendLogin
    }
}

export function useRegister() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    async function sendRegister({fullname, email, password}) {
        return new Promise(async (resolve, reject) => {
            setLoading(true);
            let status = "";
            try {
                const res = await axios.post(`${config.host}/register`, {
                    fullname,
                    email,
                    password
                });
                console.log(res.data);
                const token = res.data.access_token;
                dispatch(login(token));
                status = "success";
            } catch(err) {
                console.log(err);
                status = "error";
            } finally {
                setLoading(false);
                resolve({
                    status
                }) 
            }
        });
    }

    return {
        loading,
        sendRegister
    }
}