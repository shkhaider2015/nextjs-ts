import styled from "styled-components";

const RegisterWrapper = styled.div`
   min-height: 89.5vh;
   min-width: 100vw;
   overflow-x: hidden;
   overflow-y: auto;
   display: grid;
   place-items: center;

   .title {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0px 20px 0px;
   }

   .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30%;
      padding: 20px;
      background-color: #1d1d1d;
      border-radius: 20px;
   }
`

export default RegisterWrapper;