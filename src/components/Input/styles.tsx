import styled from "styled-components";

const InputFieldWrapper = styled.div`
  width: 100%;

  .input-container {
    width: 100%;
    border-radius: 20px;
    padding: 0% 2% 0% 2%;
    background-color: #2e2d2d;
    border: 2px solid #2e2d2d;
    border-width: 2px;
    border-style: solid;
    border-color: #2e2d2d;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s;

    &:focus-within {
      background-color: #5a5a5a;
      border-color: #eae9e9;
    }

    .input-icon {
      flex: 1;
      opacity: 0.4;
    }
  }

  .error-container {
    padding: 1% 2% 0% 2%;
    min-height: 25px;
    p {
      color: red;
      font-size: 12px;
    }
  }

  input {
    padding: 0px 10px 0px 10px;
    flex: 20;
    min-height: 40px;
    border-radius: 20px;
    background-color: #2e2d2d;
    border: none;
    transition: background-color 0.3s;

    &:focus {
      outline: none;
      background-color: #5a5a5a;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #2e2d2d inset !important;
      transition: -webkit-box-shadow 0.3s;
    }
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #5a5a5a inset !important;
    }

  }
`;

export default InputFieldWrapper;
