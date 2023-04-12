import React from "react";
import { Button, InputField } from "../../components";
import LoginWrapper from "./styles";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from 'react-icons/ri';
import {
  Formik,
} from 'formik';
import * as yup from 'yup';
import { signIn } from "next-auth/react";
import {Login as LoginScreen} from '../../src/screens'
import { useRouter } from "next/router";

const Login = () => {
  
    return <LoginWrapper>
           <LoginScreen />
    </LoginWrapper>
}

const schema = yup.object({
    email: yup
    .string()
    .required('Please enter your email.'),
    password: yup
    .string()
    .min(6, 'Minimum 6 characters are required')
    .required('Please enter your password.')
})

export default Login