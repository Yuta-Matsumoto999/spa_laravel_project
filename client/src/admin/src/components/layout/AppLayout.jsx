import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import Sidebar from '../common/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';

const AppLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            await authApi.initialCsrfToken().then((res) => {
                accessAuthCheck()
            }).catch((err) => {
                console.log(err)
            });
        }

        const accessAuthCheck = async () => {
            try {
                const response = await authApi.authenticateCheck();
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