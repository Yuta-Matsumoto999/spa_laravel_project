import React, { useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../api/authApi';

const Login = () => {
    const navigate = useNavigate();

    // validation error
    const [emailValidateErr, setEmailValidateErr] = useState("");
    const [passwordValidateErr, setPasswordValidateErr] = useState("");

    const [loading, setLoading] = useState(false)

    const login = async (e) => {
        e.preventDefault();

        // initial validate error
        setEmailValidateErr("");
        setPasswordValidateErr("");

        // get form value
        const formData = new FormData(e.target);
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();

        // validation

        let validationErr = false

        if(email === "") {
            validationErr = true;
            setEmailValidateErr("メールアドレスを入力してください。");
        }

        if(password === "") {
            validationErr = true;
            setPasswordValidateErr("パスワードを入力してください。");
        }

        if(validationErr) return;

        setLoading(true);

        // initialize csrf token and access login api
        await authApi.initialCsrfToken().then((res) => {
            authApi.login({email, password}).then((res) => {
                console.log(res);
                navigate("/");
            }).catch((err) => {
                setLoading(false);

                const errors = Array(err.data.errors);
                
                errors.forEach((error) => {
                    if(error.email) {
                        setEmailValidateErr(error.email[0]);
                    }

                    if(error.password) {
                        setPasswordValidateErr(error.password[0]);
                    }
                })
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Box component="form" onSubmit={login} noValidate>
            <TextField 
                fullWidth 
                id="email" 
                label="メールアドレス" 
                margin="normal" 
                name="email"
                required
                helperText={emailValidateErr}
                error={emailValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth 
                id="password" 
                label="パスワード" 
                margin="normal" 
                name="password"
                type="password"
                required
                helperText={passwordValidateErr}
                error={passwordValidateErr !== ""}
                disabled={loading}
            />

            <LoadingButton
                sx={{ mt: 3, mb: 2}} 
                fullWidth type="submit" 
                loading={loading}
                color="primary"
                variant="outlined"
                >
                ログイン
            </LoadingButton>
            </Box>
            <Button component={Link} to="/register">
                アカウントを持っていませんか？新規作成
            </Button>
        </>
    )
}

export default Login