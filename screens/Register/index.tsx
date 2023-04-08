import React from "react";
import { Button, InputField } from "../../components";
import RegisterWrapper from "./styles";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  Formik,
} from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const { push } = useRouter();
  return (
    <RegisterWrapper>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('http://localhost:3000/api/'+'user/register', values)
          .then(res => {
            push("/login")
          })
          .catch((err:AxiosError) => {
            console.log("Err ", err)
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
          <form
            onSubmit={handleSubmit}
            className="form"
          >

      <div className="title">Register</div>
            <InputField
              LeftIcon={MdEmail}
              type={"text"}
              name={"name"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              maxLength={30}
              error={errors.name && touched.name ? errors.name : ""}
              placeholder={"Full Name"}
            />
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
            <InputField
              LeftIcon={RiLockPasswordFill}
              type={"password"}
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              maxLength={20}
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
            />
            <Button
              type="submit"
              width="50%"
              title="Sign Up"
              disabled={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </RegisterWrapper>
  );
};

const schema = yup.object({
  name: yup
    .string()
    .min(4, "Please enter minimum of 4 charchters")
    .required("Please enter your name."),
  email: yup.string().required("Please enter your email."),
  password: yup
    .string()
    .min(6, "Minimum 6 characters are required")
    .required("Please enter your password."),
  confirmPassword: yup
    .string()
    .min(6, "Minimum 6 characters are required")
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export default Register;
