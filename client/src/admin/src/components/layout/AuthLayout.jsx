import React, { useEffect } from 'react'
import { Container, flexbox } from '@mui/system';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../../api/axiosClient/axiosClient';
import authApi from '../../api/authApi';

const AuthLayout = () => {
    return (
        <div>
        <Container component="main" maxWidth="xs">
            <Box 
            sx={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}>
                {/* <img src={} alt="" 
                    style={{ width: 100, height: 100, marginBottom: 3 }}/> */}
                Admin Login
            </Box>
            <Outlet />
        </Container>
    </div>
    )
}

export default AuthLayout