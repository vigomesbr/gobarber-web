import styled, { keyframes } from 'styled-components';
import signBackground from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;

`;

export const Background = styled.div`
    flex: 1;
    background: url("${signBackground}") no-repeat center;
    background-size: cover;
`;

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`

    display: flex;
    flex-direction: column;
    place-content: center;
    justify-content: center;

    animation: ${appearFromLeft} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }     

        a {
            color: #f4f4f4;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
               color: ${shade(0.2, '#f4f4f4')};
            }
        }
    }

    > a {
        color: #ff9000;
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: color 0.2s;
        justify-content: center;

        &:hover {
            color: ${shade(0.2, '#ff9000')};
        }

        svg {
            margin-right: 16px;
        }
    }
`;