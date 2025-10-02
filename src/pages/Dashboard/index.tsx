import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { DayPicker, type Modifiers } from 'react-day-picker';
import "react-day-picker/style.css";
import { ptBR } from 'date-fns/locale';
import { isToday, format, parseISO, isAfter } from "date-fns";
import api from "../../services/apiClient";
import { Link } from "react-router-dom";

// Estilos inline via prop `styles`
const styles = {
    day_selected: {
        backgroundColor: '#ff9000',
        color: '#232129',
    },
    day_today: {
        border: '1px solid #ff9000',
        color: '#ff9000',
        background: 'none',
    },
};

const classNames = {
    nav_button: 'nav-button',
    caption: 'caption',
    weekday: 'weekday',
    day: 'day',
    selected: 'selected',
    today: 'today',
};

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface Appointment {
    id: string;
    date: string;
    user: {
        name: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const { signOut, user } = useAuth();

    if (!user) {
        return <p>Carregando...</p>;
    }

    const handleDateChange = useCallback((day: Date, modifiers: Modifiers) => {
        if (modifiers.available) {
            setSelectedDate(day)
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);



    useEffect(() => {
        if (user) {
            api.get(`/providers/${user.id}/month-availability`, {
                params: {
                    month: currentMonth.getMonth() + 1,
                    year: currentMonth.getFullYear(),
                }
            }).then(response => {
                setMonthAvailability(response.data)
            })
        }
    }, [currentMonth, user]);

    useEffect(() => {
        api.get(`/appointments/me`, {
            params: {
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
                day: selectedDate.getDate()
            }
        }).then(response => {
            setAppointments(response.data)
            console.log(response);
        })
    }, [selectedDate]);

    const disableDays = useMemo(() => {
        const dates = monthAvailability
            .filter(monthDay => monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day);
            })
        return dates;
    }, [currentMonth, monthAvailability]);

    const selectDataAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de ' MMMM", {
            locale: ptBR
        })
    }, [selectedDate]);

    const selectWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR
        })
    }, [selectedDate]);

    const moorningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        });
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() > 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment => 
            isAfter(parseISO(appointment.date), new Date())
        )
    }, [appointments]);


    return (
        <>
            <Container>
                <Header>
                    <HeaderContent>
                        <img src={logoImg} alt="GoBarber" />
                        <Profile>
                            <img src={user.avatar_url} />
                            <div>
                                <span>Bem-vindo(a)</span>
                                <Link to="/profile">
                                    <strong>{user.name}</strong>
                                </Link>
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
                            {isToday(selectedDate) && <span>Hoje</span>}
                            <span>{selectDataAsText}</span>
                            <span>{selectWeekDay}</span>
                        </p>

                        {nextAppointment &&
                            <NextAppointment>
                                <strong>Proximo agendamento</strong>
                                <div>
                                    <img src={nextAppointment.user.avatar_url || 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'} alt={nextAppointment.user.name} />
                                    <strong>{nextAppointment.user.name}</strong>
                                    <span>
                                        <FiClock />
                                        {format(nextAppointment.date, 'HH:mm')}
                                    </span>
                                </div>
                            </NextAppointment>
                        }
                        <Section>
                            <strong>Manhã</strong>
                            {moorningAppointments.length === 0 && (
                                <p>Nenhum agendamento neste periodo</p>
                            )}
                            {moorningAppointments.map(appointment => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {format(appointment.date, 'HH:mm')}
                                    </span>

                                    <div>
                                        <img src={appointment.user.avatar_url || 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'} alt={appointment.user.name} />
                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            ))}

                        </Section>

                        <Section>
                            <strong>Tarde</strong>
                            {afternoonAppointments.length === 0 && (
                                <p>Nenhum agendamento neste periodo</p>
                            )}
                             {afternoonAppointments.map(appointment => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {format(appointment.date, 'HH:mm')}
                                    </span>

                                    <div>
                                        <img src={appointment.user.avatar_url || 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'} alt={appointment.user.name} />
                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            ))}
                        </Section>
                    </Schedule>
                    <Calendar>

                        <DayPicker
                            locale={ptBR}
                            disabled={[{ before: new Date() }, { dayOfWeek: [0] }, ...disableDays]}
                            modifiers={{
                                available: { dayOfWeek: [1, 2, 3, 4, 5] }
                            }}
                            required
                            styles={styles}
                            classNames={classNames}
                            weekStartsOn={0}
                            mode="single"
                            selected={selectedDate}
                            onDayClick={handleDateChange}
                            onMonthChange={handleMonthChange}
                        />

                    </Calendar>
                </Content>

            </Container>
        </>
    );
};

export default Dashboard;