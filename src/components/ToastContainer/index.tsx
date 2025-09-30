import React from "react";
import { Container, AnimatedToastWrapper } from "./styles";
import { type ToastMessage } from '../../hooks/toast';
import Toast from "./Toast";
import { useTransition } from 'react-spring';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    
    const messagesWithTransitions = useTransition(messages, {
        keys: message => message.id,
        from: { opacity: 0, transform: 'translateX(120%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(120%)' },
    });

    return (
        <Container>
            {messagesWithTransitions((style, item) => (
                <AnimatedToastWrapper key={item.id} style={style}>
                    <Toast 
                        message={item}
                    />
                </AnimatedToastWrapper>
            ))}
        </Container>
    );
}

export default ToastContainer;