import React, { InputHTMLAttributes, forwardRef, useState, useCallback, FocusEvent } from "react";
import { Container, Error } from "./styles";
import type { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
    error?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({icon: Icon, error, ...rest}, ref) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, []);

    const handleInputBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);

        setIsFilled(!!event.target.value);
    }, []);

    return (
        <>
        <Container $isErrored={!!error} $isFilled={isFilled} $isFocused={isFocused}>
        { Icon && <Icon size={20} /> }
        <input 
            {...rest} 
            ref={ref}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
        />
        {error && 
            <Error title={error}>
                <FiAlertCircle color="#c53030" size={20}/>
            </Error>}
        </Container>
        </>
    )
}

export default forwardRef(Input);