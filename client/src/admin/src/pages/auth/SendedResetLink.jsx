import React, { useEffect } from 'react'
import { Box, Button, TextField, ThemeProvider, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../../api/authApi';
import { SocialIcon } from 'react-social-icons';
import { FaFacebookSquare, FaTwitterSquare, FaLine, FaGoogle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { color } from '@mui/system';
import { purple } from '@mui/material/colors';

const SendedResetLink = () => {
    const navigate = useNavigate();

    // validation error
    const [emailValidateErr, setEmailValidateErr] = useState("");

    const [loading, setLoading] = useState(false)

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // initial validate error
        setEmailValidateErr("");

        // get form value
        const formData = new FormData(e.target);
        const email = formData.get("email").trim();

        // validation

        let validationErr = false

        if(email === "") {
            validationErr = true;
            setEmailValidateErr("メールアドレスを入力してください。");
        }

        if(validationErr) return;

        setLoading(true);

        const accessPasswordResetApi = async () => {
            try {
                const user = await authApi.login({email});

                if(user) {
                    navigate("/")
                }
            } catch (err) {
                setLoading(false);

                const errors = Array(err.data.errors);
                
                errors.forEach((error) => {
                    if(error.email) {
                        setEmailValidateErr(error.email[0]);
                    }
                })
            }
        }

        // initialize csrf token and access passwordReset api
        await authApi.initialCsrfToken().then((res) => {
            accessPasswordResetApi();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Sended Reset Link</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>設定したメールアドレスへパスワード再設定用リンクをお送りしました。<br />メールを確認の上、パスワードの再設定を行なってください。</Typography>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, marginTop: "15px" }}>メールが届かない場合は、再設定用リンクをリクエストしてください。</Typography>
        <Box sx={{ marginTop: "20px" }}>
            <Button variant='contained' color='purple' component={Link} to="/reset-password">
                <Typography sx={{ color: "white" }}>パスワードリセットへ</Typography>
            </Button>
        </Box>

        <Box sx={{ marginTop: "30px" }}>
            <Button component={Link} to="/login">
                <Typography sx={{ fontWight: 800 }}>ログインへ戻る</Typography>
            </Button>
        </Box>
        </>
    )
}

export default SendedResetLink