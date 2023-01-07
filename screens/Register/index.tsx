import React from "react";
import { Button, InputField } from "../../components";
import RegisterWrapper from "./styles";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from 'react-icons/ri';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import * as yup from 'yup';

const Register = () => {
    return <RegisterWrapper>
            <Formik
       initialValues={{ name: '', email: '', password: '', confirmPassword : '' }}
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
         <form onSubmit={handleSubmit} style={{ width: '30%', padding: '20px', backgroundColor: '#1d1d1d', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '20px' }} >
           <InputField 
                LeftIcon={MdEmail} 
                type={'text'}
                name={'name'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                maxLength={30}
                error={errors.name && touched.name ? errors.name : "" }
                />
           <InputField 
                LeftIcon={MdEmail} 
                type={'email'}
                name={'email'}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                maxLength={20}
                error={errors.password && touched.password ? errors.password : "" }
            />
            <InputField 
                LeftIcon={RiLockPasswordFill}  
                type={'password'} 
                name={'confirmPassword'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                maxLength={20} 
                error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : "" }
            />
            <Button type="submit" width="50%" title="Sign Up" disabled={isSubmitting} />
         </form>
       )}
     </Formik>
    </RegisterWrapper>
}

const schema = yup.object({
  name: yup
    .string()
    .min(4, "Please enter minimum of 4 charchters")
    .required('Please enter your name.'),
    email: yup
    .string()
    .required('Please enter your email.'),
    password: yup
    .string()
    .min(6, 'Minimum 6 characters are required')
    .required('Please enter your password.'),
    confirmPassword: yup
    .string()
    .min(6, 'Minimum 6 characters are required')
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
})

export default Register