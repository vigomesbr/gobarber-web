import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`

`;


export const Header = styled.header`
    padding: 32px 0;
    background: #28262e;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        background: transparent;
        border: 0;

        svg {
            color: #999591;
            width: 20px;
            height: 20px;
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            color: #f4ede8;
        }

        strong {
            color: #ff9000;
        }

        a {
            text-decoration: none;

            &:hover {
                opacity: 0.8;
            }
        }
    }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`;

export const Schedule = styled.div`
    flex: 1;
    margin-right: 120px;

    h1: {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
        color: #ff9000;
        display: flex;
        align-items: center;
        font-weight: 500;
    }

    span {
        display: flex;
        align-items: center;
    }

    span + span::before {
        content: '';
        width: 1px;
        height: 12px;
        background: #ff9000;
        margin: 0 8px;
    }
`;

export const NextAppointment = styled.aside`
    margin-top: 64px;

    > strong {
        color: #999591;
        font-size: 20px;
        font-weight: 400;
    }

    div {
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-top: 24px;
        position: relative;

        &::before {
            position: absolute;
            height: 80%;
            width: 1px;
            left: 0;
            top: 10%;
            content: '';
            background: #ff9000;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #fff;
        }

        span {
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #999591;

            svg {
                color: #ff9000;
                margin-right: 8px;
            }
        }
    }
`;

export const Section = styled.section`
    margin-top: 48px;

    > strong {
        color: #999591;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #3e3b47;
        display: block;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }

    > p {
        color: #999591;
    }
`;

export const Appointment = styled.div`
    display: flex;
    align-items: center;

    & + div {
        margin-top: 16px;
    }

    span {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #f4ede8;
        width: 70px;

        svg {
            color: #ff9000;
            margin-right: 8px;
        }
      
    }

    div {
        flex: 1;
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-left: 24px;

        img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #fff;
            font-size: 20px;
        }
    }

`;

export const Calendar = styled.aside`
    max-width: 380px;
    max-height: 360px;
    background: #28262e;
    border-radius: 10px;
    padding: 16px;

    .caption {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .rdp-nav {
        display: flex;
        justify-content: space-between;
    }

    .rdp-nav button {
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 8px; 
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
    }

    .rdp-nav button svg.rdp-chevron {
        fill: #999591 !important;
        transition: fill 0.2s;
    }

    .rdp-nav button:hover svg.rdp-chevron {
        fill: #ff9000 !important;  
    }

    .weekday {
        color: #666360;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: 500;
    }

    .day {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        color: #f4ede8;
        transition: background-color 0.2s, color 0.2s;

        &:hover:not(.rdp-day_disabled):not(.selected) {
            background-color: #ff900033; 
            color: #ff9000;
        }
    }

    .selected {
        background-color: #ff9000 !important;
        color: #232129 !important;
        font-weight: 600;
    }

    .today {
        border: 1px solid #ff9000 !important;
        color: #ff9000 !important;
        background: none !important;
        font-weight: normal;
    }

`;
