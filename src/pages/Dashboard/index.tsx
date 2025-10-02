import React, { useState } from "react";
import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile, 
    Content, 
    Schedule, 
    Calendar, 
    NextAppointment, 
    Section, 
    Appointment 
} from "./styles";
import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
//import { DayPicker } from 'react-day-picker';
//import "react-day-picker/style.css";

const Dashboard: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState(new Date())

    const { signOut, user } = useAuth();


    return (
        <>
            <Container>
                <Header>
                    <HeaderContent>
                        <img src={logoImg} alt="GoBarber" />
                        <Profile>
                            <img src={user.avatar_url} alt={user.name} />
                            <div>
                                <span>Bem-vindo(a)</span>
                                <strong>{user.name}</strong>
                            </div>
                        </Profile>

                        <button type="button" onClick={signOut}>
                            <FiPower />
                        </button>

                    </HeaderContent>
                </Header>

                <Content>
                    <Schedule>
                        <h1>Horários agendados</h1>
                        <p>
                            <span>Hoje</span>
                            <span>Dia 06</span>
                            <span>Segunda-feira</span>
                        </p>

                        <NextAppointment>
                            <strong>Atendimento a seguir</strong>
                            <div>
                                <img src="https://avatars.githubusercontent.com/u/20708202?v=4" alt="Vinicius" />
                                <strong>Vinicius</strong>
                                <span>
                                    <FiClock />
                                    08:00
                                </span>
                            </div>
                        </NextAppointment>

                        <Section>
                            <strong>Manhã</strong>

                            <Appointment>
                                <span>
                                    <FiClock />
                                    08:00
                                </span>

                                <div>
                                    <img src="https://avatars.githubusercontent.com/u/20708202?v=4" alt="Vinicius" />
                                    <strong>Vinicius</strong>
                                </div>
                            </Appointment>
                            <Appointment>
                                <span>
                                    <FiClock />
                                    08:00
                                </span>

                                <div>
                                    <img src="https://avatars.githubusercontent.com/u/20708202?v=4" alt="Vinicius" />
                                    <strong>Vinicius</strong>
                                </div>
                            </Appointment>
                        </Section>

                        <Section>
                            <strong>Tarde</strong>
                            <Appointment>
                                <span>
                                    <FiClock />
                                    08:00
                                </span>

                                <div>
                                    <img src="https://avatars.githubusercontent.com/u/20708202?v=4" alt="Vinicius" />
                                    <strong>Vinicius</strong>
                                </div>
                            </Appointment>
                        </Section>
                    </Schedule>
                    <Calendar>
                        {/** 
                        <DayPicker
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            footer={
                                selectedDate ? `Selected: ${selectedDate.toLocaleDateString()}` : "Pick a day."
                            }
                        />
                        */}
                    </Calendar>
                </Content>

            </Container>
        </>
    );
};

export default Dashboard;