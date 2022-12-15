import React from 'react'
import { Box, Button, TextField, Select, MenuItem } from '@mui/material';
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
    const [organization_name, setOrganization_name] = useState("");
    const [organization_address_number, setOrganization_address_number] = useState("");
    const [organization_prefecture, setOrganization_prefecture] = useState("");
    const [organization_city, setOrganization_city] = useState("");
    const [organization_address, setOrganization_address] = useState("");

    // validation error message
    const [nameValidateErr, setNameValidateErr] = useState("");
    const [emailValidateErr, setEmailValidateErr] = useState("");
    const [passwordValidateErr, setPasswordValidateErr] = useState("");
    const [passwordConfirmationValidateErr, setPasswordConfirmationValidateErr] = useState("");
    const [organizationNameValidateErr, setOrganizationNameValidateErr] = useState("");
    const [organizationAddressNumberValidateErr, setOrganizationAddressNumberValidateErr] = useState("");
    const [organizationPrefectureValidateErr, setOrganizationPrefectureValidateErr] = useState("");
    const [organizationCityValidateErr, setOrganizationCityValidateErr] = useState("");
    const [organizationAddressValidateErr, setOrganizationAddressValidateErr] = useState("");

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

    // organization name input
    const handleOrganizationName = (e) => {
        const newOrganizationName = e.target.value.trim();
        setOrganizationNameValidateErr("");

        if(newOrganizationName === "") {
            setOrganizationNameValidateErr("組織名を入力してください。")
        }
        setOrganization_name(newOrganizationName);
    }

    const onFocusOrganizationName = (e) => {
        const organizationNameValue = e.target.value;

        if(organizationNameValue === "") {
            setOrganizationNameValidateErr("組織名を入力してください。")
        }
    }

    // organization prefecture input
    const handleOrganizationPrefecture = (e) => {
        const newOrganizationPrefecture = e.target.value.trim();
        setOrganizationPrefectureValidateErr("");

        if(newOrganizationPrefecture === "") {
            setOrganizationPrefectureValidateErr("都道府県を入力してください。")
        } else {
            const match_prefecture = prefectureReference.some((value) => {
                return value === newOrganizationPrefecture;
            });

            if(match_prefecture === false) {
                setOrganizationPrefectureValidateErr("都道府県が正しくありません。")
            }
        }
        setOrganization_prefecture(newOrganizationPrefecture);
    }

    const onFocusOrganizationPrefecture = (e) => {
        const organizationPrefectureValue = e.target.value;

        if(organizationPrefectureValue === "") {
            setOrganizationPrefectureValidateErr("都道府県を入力してください。")
        }
    }

    // organization city input
    const handleOrganizationCity = (e) => {
        const newOrganizationCity = e.target.value.trim();
        setOrganizationCityValidateErr("");

        if(newOrganizationCity === "") {
            setOrganizationCityValidateErr("市区町村を入力してください。")
        }
        setOrganization_city(newOrganizationCity);
    }

    const onFocusOrganizationCity = (e) => {
        const organizationCityValue = e.target.value;

        if(organizationCityValue === "") {
            setOrganizationCityValidateErr("市区町村を入力してください。")
        }
    }

    // organization address input
    const handleOrganizationAddress = (e) => {
        const newOrganizationAddress = e.target.value.trim();
        setOrganizationAddressValidateErr("");

        if(newOrganizationAddress === "") {
            setOrganizationAddressValidateErr("町名・番地・建物名を入力してください。")
        }
        setOrganization_address(newOrganizationAddress);
    }


    const onFocusOrganizationAddress = (e) => {
        const organizationAddressValue = e.target.value;
        
        if(organizationAddressValue === "") {
            setOrganizationAddressValidateErr("町名・番地・建物名を入力してください。")
        }
    }

    // address search by zipcode
    const handleZipCodeSearch = async (e) => {
        const zipCode = e.target.value;

        setOrganizationAddressNumberValidateErr("");

        if(zipCode === "") {
            setOrganizationAddressNumberValidateErr("郵便番号を入力してください。")
        } 

        const include_hyphen = zipCode.includes('-');
        
        if(include_hyphen) {
            setOrganizationAddressNumberValidateErr("郵便番号は、ハイフンなしで入力してください。")
        } else if(zipCode.length !== 7) {
            setOrganizationAddressNumberValidateErr("郵便番号は、7文字で入力してください。")
        }
        setOrganization_address_number(zipCode);

        try {
            const res = await axios.get("https://zipcloud.ibsnet.co.jp/api/search", {
                params: {
                    zipcode: zipCode
                }
            });

            if(res.data.results) {
                setOrganization_prefecture(res.data.results[0].address1);
                setOrganization_city(res.data.results[0].address2);
                setOrganization_address(res.data.results[0].address3);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // onfocus organization address_number
    const onfocusOrganizationAddressNumber = (e) => {
        const organizationAddressNumberValue = e.target.value;

        if(organizationAddressNumberValue === "") {
            setOrganizationAddressNumberValidateErr("郵便番号を入力してください。")
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
        setOrganizationNameValidateErr("")
        setOrganizationAddressNumberValidateErr("")
        setOrganizationPrefectureValidateErr("")
        setOrganizationCityValidateErr("")
        setOrganizationAddressValidateErr("")

        const accessRegisterApi = async () => {
            try{
                const user = await authApi.register({
                    name,
                    email,
                    password,
                    password_confirmation,
                    organization_name,
                    organization_address_number,
                    organization_prefecture,
                    organization_city,
                    organization_address
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

                    if(error.organization_name) {
                        setOrganizationNameValidateErr(error.organization_name[0]);
                    }

                    if(error.organization_address_number) {
                        setOrganizationAddressNumberValidateErr(error.organization_address_number[0]);
                    }

                    if(error.organization_prefecture) {
                        setOrganizationPrefectureValidateErr(error.organization_prefecture[0]);
                    }

                    if(error.organization_city) {
                        setOrganizationCityValidateErr(error.organization_city[0]);
                    }

                    if(error.organization_address) {
                        setOrganizationAddressValidateErr(error.organization_address[0]);
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

            <TextField 
                fullWidth
                onChange={handleOrganizationName}
                onFocus={onFocusOrganizationName}
                value={organization_name}
                id="organization_name" 
                label="組織名" 
                margin="normal" 
                name="organization_name"
                required
                helperText={organizationNameValidateErr}
                error={organizationNameValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth
                onChange={handleZipCodeSearch}
                onFocus={onfocusOrganizationAddressNumber}
                value={organization_address_number}
                id="organization_address_number" 
                label="郵便番号" 
                margin="normal"
                name="organization_address_number"
                placeholder='ex): 1234567'
                required
                helperText={organizationAddressNumberValidateErr}
                error={organizationAddressNumberValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth
                onChange={handleOrganizationPrefecture}
                onFocus={onFocusOrganizationPrefecture}
                value={organization_prefecture}
                id="organization_prefecture" 
                label="都道府県" 
                margin="normal"
                name="organization_prefecture"
                placeholder='ex): 埼玉県'
                required
                helperText={organizationPrefectureValidateErr}
                error={organizationPrefectureValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth
                onChange={handleOrganizationCity}
                onFocus={onFocusOrganizationCity}
                value={organization_city}
                id="organization_city" 
                label="市区町村" 
                margin="normal"
                name="organization_city"
                required
                helperText={organizationCityValidateErr}
                error={organizationCityValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth
                onChange={handleOrganizationAddress}
                onFocus={onFocusOrganizationAddress}
                value={organization_address}
                id="organization_address" 
                label="町名・番地・建物名" 
                margin="normal"
                name="organization_address"
                required
                helperText={organizationAddressValidateErr}
                error={organizationAddressValidateErr !== ""}
                disabled={loading}
            />

            <LoadingButton
                sx={{ mt: 3, mb: 2}} 
                fullWidth type="submit" 
                loading={loading}
                color="primary"
                variant="outlined"
                >
                新規作成
            </LoadingButton>
            </Box>
            <Button component={Link} to="/login">
                既にアカウントをお持ちですか？ログイン
            </Button>
        </>
    )
}

export default Register