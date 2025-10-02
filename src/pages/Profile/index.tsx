import React, { useCallback } from "react";
import { Container, Content, AvatarInput } from './styles';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../services/apiClient";
import { useToast } from "../../hooks/toast";
import { profileFormSchema, type ProfileFormData } from "../../schemas/profileSchemas";
import { useAuth } from "../../hooks/auth";


const Profile: React.FC = () => {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            email: '',
            old_password: '',
            new_password: '',
            password_confirmation: '',
        }
    });

    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSignUp: SubmitHandler<ProfileFormData> = useCallback(async (data) => {
        try {
            await api.put('/profile/update', {
                name: data.name,
                email: data.email,
                password: data.new_password,
                old_password: data.old_password
            });

            addToast({
                type: 'success',
                title: 'Perfil atualizado!'
            })

            navigate('/dashboard');

        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao atualizar o perfil, tente novamente.'
            });

            return;
        }

    }, [addToast, navigate]);

    return (
        <>
            <Container>

                <header>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </header>

                <Content>

                    <form onSubmit={handleSubmit(handleSignUp)}>

                        <AvatarInput>
                            <img src={user.avatar_url || 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'} alt={user.name} />
                            <button type="button"><FiCamera /></button>
                        </AvatarInput>

                        <h1>Meu perfil</h1>

                        <Input
                            icon={FiUser}
                            placeholder="Usuário"
                            error={errors.name?.message}
                            {...register('name')}
                        />
                        <Input
                            icon={FiMail}
                            placeholder="Email"
                            error={errors.email?.message}
                            {...register('email')}
                        />
                        <br />
                        <Input
                            icon={FiLock}
                            type="password"
                            placeholder="Senha atual"
                            error={errors.old_password?.message}
                            {...register('old_password')}
                        />

                        <Input
                            icon={FiLock}
                            type="password"
                            placeholder="Nova senha"
                            error={errors.new_password?.message}
                            {...register('new_password')}
                        />

                        <Input
                            icon={FiLock}
                            type="password"
                            placeholder="Confirmar senha"
                            error={errors.password_confirmation?.message}
                            {...register('password_confirmation')}
                        />
                        <Button type="submit">{isSubmitting ? 'Atualizando...' : 'Confirmar mudanças'}</Button>

                    </form>
                </Content>

            </Container>
        </>
    );
};

export default Profile;