import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from 'state'
import UploadPhoto from './uploadPhoto'
import ButtonProgress from 'components/ButtonProgress'

const HOST = process.env.REACT_APP_HOST;

// ***** YUP VALIDATION SCHEMA
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
};

const initialValuesLogin = {
    email: '',
    password: '',
};


const Form = () => {
    const [pageType, setPageType] = useState("login")
    const [uploadURL, setUploadURL] = useState(null)
    const [loading, setLoading] = useState(false)
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const isLogin = pageType === "login"
    const isRegister = pageType === "register"
    const isUploadPhoto = pageType === "uploadPhoto"

    const login = async (values, onSubmitProps) => {
        setLoading(true);
        const loggedInResponse = await fetch(`${HOST}/auth/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        if (loggedIn.success) {
            onSubmitProps.resetForm();
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    userPhoto: loggedIn.userPhoto,
                    token: loggedIn.token,
                })

            )
            navigate('/home')
        }
        setLoading(false);
    }

    const register = async (values, onSubmitProps) => {
        try {
            setLoading(true);
            const savedUserResponse = await fetch(`${HOST}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const savedUser = await savedUserResponse.json();
            if (savedUser.success) {
                setUploadURL(savedUser.url);
                setPageType('uploadPhoto');
                onSubmitProps.resetForm();
                // setPageType('login');
            } else {
                // ****** ~ Server error popup
            }
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            await login(values, onSubmitProps)
        }

        else if (isRegister) {
            await register(values, onSubmitProps)
        }
    };

    const handleSkip = () => {
        setPageType("login")
    }



    return (
        <>
            {isUploadPhoto ?
                <UploadPhoto uploadURL={uploadURL} handleSkip={handleSkip} />
                :
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                    validationSchema={isLogin ? loginSchema : registerSchema}>
                    {/* // ~ TYPICAL SYNTAX OF FORMIK */}
                    {({
                        values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm
                    }) => (
                        <form
                        // onSubmit={handleSubmit}
                        >
                            <Box display="grid" gap='30px' gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                                sx={{
                                    // ~ APPLYING MEDIAQUERY TO MAKE SPAN FULL
                                    // ~ divs AFTER THIS IS SELECTED BY & > div 
                                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                                }}>

                                {isRegister && (
                                    <>
                                        <TextField label='First Name'
                                            name='firstName'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{ gridColumn: 'span 2' }}
                                        />
                                        <TextField label='Last Name'
                                            name='lastName'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{ gridColumn: 'span 2' }}
                                        />
                                        <TextField label='Location'
                                            name='location'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.location}
                                            error={Boolean(touched.location) && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                        <TextField label='Occupation'
                                            name='occupation'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.occupation}
                                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                            helperText={touched.occupation && errors.occupation}
                                            sx={{ gridColumn: 'span 4' }}
                                        />

                                    </>
                                )}
                                <TextField
                                    sx={{ gridColumn: 'span 4' }}
                                    label='Email id'
                                    name='email'
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />

                                <TextField
                                    sx={{ gridColumn: 'span 4' }}
                                    label='Password'
                                    name='password'
                                    type='password'
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </Box>

                            <Box>


                                <Box sx={{ m: '2rem 0' }}>
                                    <ButtonProgress
                                        loading={loading}
                                        large={true}
                                        label={isLogin ? 'LOGIN' : 'REGISTER'}
                                        handleClick={async () => await handleSubmit()}
                                        fullWidth
                                    />
                                </Box>
                                <Typography
                                    onClick={() => {
                                        setPageType(isLogin ? 'register' : 'login')
                                        resetForm()
                                    }}
                                    sx={{
                                        textDecoration: 'underline',
                                        color: palette.primary.main,
                                        '&:hover': {
                                            cursor: 'pointer',
                                            color: palette.primary.light,
                                        }
                                    }}
                                >
                                    {isLogin ? "Don't have an account? Sign up here." : "Already have an account? Login here."}
                                </Typography>
                            </Box>
                        </form>
                    )}
                </Formik>

            }
        </>

    )
}

export default Form 