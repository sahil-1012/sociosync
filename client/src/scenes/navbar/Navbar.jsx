import React, { useState } from 'react'

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from "state"
import { useNavigate } from 'react-router-dom'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark

    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;


    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt}>
            <FlexBetween gap={"1.75rem"}>
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)" >
                    Sociopedia
                </Typography>
            </FlexBetween>

        </FlexBetween>
    )
}

export default Navbar;