import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/FlexBetween'
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@mui/icons-material'
import { setLogin } from 'state'


// ***** YUP VALIDATION SCHEMA
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
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
    picture: '',
};

const initialValuesLogin = {
    email: '',
    password: '',
};


const Form = () => {
    const [pageType, setPageType] = useState("login")
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const isLogin = pageType === "login"
    const isRegister = pageType === "register"

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            'http://localhost:3001/auth/login',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            }
        );
        console.log(loggedInResponse)
        const loggedIn = await loggedInResponse.json();

        if (loggedIn) {
            onSubmitProps.resetForm();
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            )
            navigate('/home')
        }
    }

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        console.log(formData);

        for (let key in values) {
            // Handle the 'picture' field separately
            if (key === 'picture') {
                formData.append('picturePath', values[key].name);
                // formData.append(key, values[key]);
            } else {
                console.log(key, values[key]);
                formData.append(key, values[key]);
            }
        }
        
        console.log(formData);

        try {
            const savedUserResponse = await fetch(
                'http://localhost:3001/auth/register',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (savedUserResponse.ok) {
                const savedUser = await savedUserResponse.json();

                if (savedUser.status === 200) {
                    setPageType('login');
                    onSubmitProps.resetForm();
                }
            } else {
                // Handle HTTP error, e.g., non-200 response
                // You can check savedUserResponse.status and handle the error accordingly
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(isRegister)

        if (isLogin) {
            await login(values, onSubmitProps)
        }
        else if (isRegister) {
            await register(values, onSubmitProps)
        }
    };



    return (
        <Formik onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {/* // ~ TYPICAL SYNTAX OF FORMIK */}
            {({
                values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm
            }) => (
                <form onSubmit={handleSubmit}>
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
                                <Box
                                    gridColumn='span 4'
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius='5px'
                                    p='1rem'
                                >
                                    <Dropzone
                                        acceptedFiles='.jpg,.jpeg,.png'
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue('picture', acceptedFiles[0])}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p='1rem'
                                                sx={{
                                                    '&:hover': { cursor: 'pointer' }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlined />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
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
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                m: '2rem 0',
                                p: '1rem',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover': { color: palette.primary.main }
                            }}
                        >
                            {isLogin ? 'LOGIN' : 'REGISTER'}
                        </Button>

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
    )
}

export default Form 