import React from "react";
import { Button, InputField } from "../../components";
import LoginWrapper from "./styles";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from 'react-icons/ri';
import {
  Formik,
} from 'formik';
import * as yup from 'yup';

const Login = () => {
    return <LoginWrapper>
            <Formik
       initialValues={{ email: '', password: ''}}
       validationSchema={schema}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} className="form" >

    <div className="title">Login</div>
           <InputField 
                LeftIcon={MdEmail} 
                type={'email'}
                name={'email'}
                placeholder={"Email Address"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                maxLength={30}
                error={errors.email && touched.email ? errors.email : "" }
                />
            <InputField
                LeftIcon={RiLockPasswordFill}  
                type={'password'}
                name={'password'}
                placeholder={"Password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                maxLength={20}
                error={errors.password && touched.password ? errors.password : "" }
            />
            <Button type="submit" width="50%" title="Sign In" disabled={isSubmitting} />
         </form>
       )}
     </Formik>
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