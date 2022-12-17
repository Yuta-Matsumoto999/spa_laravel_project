import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from '@mui/material';
import authApi from '../../api/authApi';
import { useNavigate } from 'react-router';

const Sidebar = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);

    const logout = async () => {
        try {
            await authApi.logout();
            navigate("/login");
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            Sidebar {user.name}
            <Button
                sx={{ mt: 3, mb: 2}} 
                fullWidth 
                onClick={logout}
                type="submit" 
                color="primary"
                variant="outlined"
                >
                ログアウト
            </Button>
        </div>
    )
}

export default Sidebar