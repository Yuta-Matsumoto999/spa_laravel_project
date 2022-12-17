import React from 'react'
import { Box, Button, TextField, Select, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../api/authApi';
import prefectureReference from '../utils/validation/prefectureReference';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    // input 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    // validation error message
    const [nameValidateErr, setNameValidateErr] = useState("");
    const [emailValidateErr, setEmailValidateErr] = useState("");
    const [passwordValidateErr, setPasswordValidateErr] = useState("");
    const [passwordConfirmationValidateErr, setPasswordConfirmationValidateErr] = useState("");

    const [loading, setLoading] = useState(false)
    
    // name input
    const handleName = (e) => {
        const newName = e.target.value.trim();
        setNameValidateErr("");

        if(newName === "") {
            setNameValidateErr("名前を入力してください。");
        }
        setName(newName);
    }
    
    const onFocusName = (e) => {
        const nameValue = e.target.value;

        if(nameValue === "") {
            setNameValidateErr("名前を入力してください。");
        }
    }

    // email input
    const handleEmail = (e) => {
        const newEmail = e.target.value.trim();
        setEmailValidateErr("");

        if(newEmail === "") {
            setEmailValidateErr("メールアドレスを入力してください。")
        }
        setEmail(newEmail);
    }

    const onFocusEmail = (e) => {
        const emailValue = e.target.value;

        if(emailValue === "") {
            setEmailValidateErr("メールアドレスを入力してください。")
        }
    }

    // password input
    const handlePassword = (e) => {
        const newPassword = e.target.value.trim();
        setPasswordValidateErr("");

        if(newPassword === "") {
            setPasswordValidateErr("パスワードを入力してください。")
        } else if(newPassword.length < 8) {
            setPasswordValidateErr("パスワードは8文字以上です。")
        }
        setPassword(newPassword);
    }

    const onFocusPassword = (e) => {
        const passwordValue = e.target.value;

        if(passwordValue === "") {
            setPasswordValidateErr("パスワードを入力してください。")
        }
    }

    // password confirmation input
    const handlePasswordConfirmation = (e) => {
        const newPasswordConfirmation = e.target.value.trim();
        setPasswordConfirmationValidateErr("");

        if(newPasswordConfirmation === "") {
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。");
        } else if(newPasswordConfirmation.length < 8) {
            setPasswordConfirmationValidateErr("パスワード(確認用)は、8文字以上です。")
        } else if(newPasswordConfirmation !== password) {
            setPasswordConfirmationValidateErr("パスワードが一致していません。")
        }
        setPassword_confirmation(newPasswordConfirmation);
    }

    const onFocusPasswordConfirmation = (e) => {
        const passwordConfirmationValue = e.target.value;

        if(passwordConfirmationValue === "") {
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。")
        }
    }


    const register = async (e) => {
        e.preventDefault();

        setLoading(true);

        // initialize validate message
        setNameValidateErr("")
        setEmailValidateErr("")
        setPasswordValidateErr("")
        setPasswordConfirmationValidateErr("")

        const accessRegisterApi = async () => {
            try{
                const user = await authApi.register({
                    name,
                    email,
                    password,
                    password_confirmation,
                })

                if(user) {
                    navigate("/")
                }

            } catch (err) {
                setLoading(false);

                const errors = Array(err.data.errors);
                
                errors.forEach((error) => {
                    if(error.name) {
                        setNameValidateErr(error.name[0]);
                    }

                    if(error.email) {
                        setEmailValidateErr(error.email[0]);
                    }

                    if(error.password) {
                        if(error.password[0] === "パスワードが一致していません。") {
                            setPasswordConfirmationValidateErr("パスワードが一致していません。")
                        } else {
                            setPasswordValidateErr(error.password[0]);
                        }
                    }
                })
            }
        }

        // initialize csrf token and access register api
        await authApi.initialCsrfToken().then((res) => {
            accessRegisterApi();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Sign Up</Typography>
        <Box component="form" onSubmit={register} noValidate>
            <TextField 
                fullWidth
                onChange={handleName}
                onFocus={onFocusName}
                value={name}
                id="name" 
                label="名前" 
                margin="normal" 
                name="name"
                required
                helperText={nameValidateErr}
                error={nameValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth 
                onChange={handleEmail}
                onFocus={onFocusEmail}
                value={email}
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
                onChange={handlePassword}
                onFocus={onFocusPassword}
                value={password}
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

            <TextField 
                fullWidth
                onChange={handlePasswordConfirmation}
                onFocus={onFocusPasswordConfirmation}
                value={password_confirmation}
                id="password_confirmation" 
                label="パスワード(確認)"
                margin="normal" 
                name="password_confirmation"
                type="password"
                required
                helperText={passwordConfirmationValidateErr}
                error={passwordConfirmationValidateErr !== ""}
                disabled={loading}
            />

            <LoadingButton
                sx={{ mt: 3, mb: 2}} 
                fullWidth type="submit" 
                loading={loading}
                color="success"
                variant="contained"
                >
                Sign Up
            </LoadingButton>
            </Box>
            <Button component={Link} to="/login" sx={{ marginTop: "15px"}}>
                <Typography sx={{ color: "black",  fontSize: "0.9rem"}}>アカウントをお持ちですか？</Typography>
                <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>ログイン</Typography>
            </Button>
        </>
    )
}

export default Register