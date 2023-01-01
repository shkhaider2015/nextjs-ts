import React from "react";
import InputFieldWrapper from "./styles";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'


const InputField: React.FC<InputProps> = (props) => {
    const {label, LeftIcon, RightIcon, error, type, ...rest} = props;
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    function togglePassword() {
        setShowPassword(!showPassword)
    }

    function _onFocus() {
        setIsFocused(true);
    }

    function _onBlur() {
        setIsFocused(false)
    }

    return <InputFieldWrapper>
    <div className="input-container" onFocus={_onFocus} onBlur={_onBlur} >
        { LeftIcon ? <LeftIcon className='input-icon' /> : null }
        <input type={type === 'password' ? showPassword ? 'text' : type : type  } {...rest}  />
        {
            type === 'password'
            ? showPassword
                ?  <AiFillEyeInvisible className='input-icon' onClick={togglePassword} /> 
                : <AiFillEye className='input-icon' onClick={togglePassword} />
            : RightIcon 
                ? <RightIcon className='input-icon' /> 
                : null
        }
    </div>
    <div className="error-container" > 
        <p>{error}</p>
    </div>
    </InputFieldWrapper>
}


interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
    label?: string;
    LeftIcon?: any;
    RightIcon?: any;
    error?: String;
}


export default InputField;