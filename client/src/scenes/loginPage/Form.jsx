import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/FlexBetween'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// ***** YUP VALIDATION SCHEMA
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.email('').required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.email('').required("required"),
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

    const handleFormSubmit = async (values, onsubmitProps) => {


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
                        '& > div' : {gridColumn :isNonMobile ? undefined : 'span 4'}
                    }}>

                    </Box>

                </form>
            )}
        </Formik>
    )
}

export default Form 