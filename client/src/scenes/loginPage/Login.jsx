import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Form from './Form'

const LoginPage = () => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    return (
        <Box >
            <Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    SocioSync
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? '50%' : '93%'}
                p='2rem' m='2rem auto'
                borderRadius='1.5rem'
                backgroundColor={theme.palette.background.alt}
            >

                <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
                    Welcome to SocioSync, the Social Media for SocioPaths !
                </Typography>
                <Form />


            </Box>
        </Box>
    )
}

export default LoginPage