import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
justify-content: center;
       
    header {
        height: 144px;
        background: #282828;
    }
`;


export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    margin: -175 auto 0;

    form {
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;
        

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
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

`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    button {
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 20px;
            height: 20px; 
        }

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }

    }

    
`;
