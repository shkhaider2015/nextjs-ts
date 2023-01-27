import ButtonWrapper from "./styles";

const Button:React.FC<IButtonProps> = (props) => {
    const { title, width, ...rest } = props;

    return <ButtonWrapper width={width || '100%' } >
        <button {...rest}  >{title}</button>
    </ButtonWrapper>
}

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    title?: string;
    width?: string;
}

export default Button;