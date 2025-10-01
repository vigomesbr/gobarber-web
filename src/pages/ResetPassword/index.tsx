import React, { useCallback } from "react";
import { Container, Content, Background, AnimationContainer } from './styles';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordFormSchema, type ResetPasswordFormData } from '../../schemas/resetPasswordSchemas';
import logoImg from '../../assets/logo.svg';
import { FiLock } from 'react-icons/fi';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useToast } from "../../hooks/toast";
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from "../../services/apiClient";

const ResetPassword: React.FC = () => {

    const { addToast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');


    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
            password_confirmation: ''
        }
    });

    const handleSignIn: SubmitHandler<ResetPasswordFormData> = useCallback(async (data) => {
        try {
            await api.post('/password/reset', {
                password: data.password,
                token
            });

            addToast({
                type: 'success',
                title: 'Senha redefinida!',
                description: 'Faça seu login usando a nova senha.'
            });
            navigate('/');

        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorrou um erro ao resetar sua senha, tente novamente.'
            });
        }
    }, [addToast]);

    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="GoBarber" />

                        <form onSubmit={handleSubmit(handleSignIn)}>
                            <h1>Defina uma nova senha</h1>

                            <Input
                                icon={FiLock}
                                type="password"
                                placeholder="Nova senha"
                                error={errors.password?.message}
                                {...register('password')}
                            />

                            <Input
                                icon={FiLock}
                                type="password"
                                placeholder="Confirme sua senha"
                                error={errors.password_confirmation?.message}
                                {...register('password_confirmation')}
                            />
                            <Button type="submit">{isSubmitting ? 'Entrando...' : 'Entrar'}</Button>

                        </form>

                    </AnimationContainer>
                </Content>
                <Background />
            </Container>
        </>
    );
}

export default ResetPassword;