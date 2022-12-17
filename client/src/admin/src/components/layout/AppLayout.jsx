import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import Sidebar from '../common/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/features/userSlice';
import authApi from '../../api/authApi';

const AppLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authApi.authenticateCheck();
                dispatch(setUser(user));
            } catch (err) {
                // 未認証の場合は、loginへリダイレクト
                console.log(err);
                navigate("login")
            }
        }
        checkAuth();
    }, []);

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sidebar/>
                <Box sx ={{ flexGrow: 1, p: 1, width: "max-content" }}>
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default AppLayout