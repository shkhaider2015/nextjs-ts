import React from "react";
import { Button, InputField } from "src/components";
import LoginWrapper from "./styles";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Formik } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useAuth } from "src/hooks";

const Login = () => {
  const router = useRouter()
  const {error} = router.query;
  let isAuthenticated = useAuth();
  
  return (
    <LoginWrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          signIn('credentials', { email: values.email, password: values.password })
            .then(res => {
              console.log("Res : ", res);
            })
            .catch(err => {
              console.log("Error : ", err);
            })
            .finally(()=>{
              setSubmitting(false);
            })
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
          <form onSubmit={handleSubmit} className="form">
            <div className="title">Login</div>
            <div className="error">  {
             error && !_.isEmpty(error) && !_.isArray(error) && JSON.parse(error)?.message
            }  </div>
            <InputField
              LeftIcon={MdEmail}
              type={"email"}
              name={"email"}
              placeholder={"Email Address"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              maxLength={30}
              error={errors.email && touched.email ? errors.email : ""}
            />
            <InputField
              LeftIcon={RiLockPasswordFill}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              maxLength={20}
              error={errors.password && touched.password ? errors.password : ""}
            />
            <Button
              type="submit"
              width="50%"
              title="Sign In"
              disabled={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </LoginWrapper>
  );
};

const schema = yup.object({
  email: yup.string().required("Please enter your email."),
  password: yup
    .string()
    .min(6, "Minimum 6 characters are required")
    .required("Please enter your password."),
});

export default Login;
