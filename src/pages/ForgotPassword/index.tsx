import React, { useCallback }from "react";
import { Container, Content, Background, AnimationContainer } from './styles';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { forgotPasswordFormSchema, type ForgotPasswordFormData } from '../../schemas/forgotPasswordSchema';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../services/apiClient";
import { useToast } from "../../hooks/toast";


const ForgotPassword: React.FC = () => {

    const { 
        register,
        handleSubmit, 
        formState: { isSubmitting, errors } 
    } = useForm<ForgotPasswordFormData>({ 
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: '',
        }
    });

    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSignUp: SubmitHandler<ForgotPasswordFormData> = useCallback(async (data) => {
        try{
            await api.post('/password/forgot', data);

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado!',
                description: 'Cheque sua caixa de entrada'
            })

            navigate('/'); 

        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realizar a recuperação de senha.'
            });

            return;
        }

    }, [addToast, navigate]);

    return (
        <>
        <Container>
            <Background />

            <Content>
                <AnimationContainer>        
                    <img src={logoImg} alt="GoBarber" />

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <h1>Recuperar senha</h1>
    
                        <Input 
                            icon={FiMail} 
                            placeholder="Email" 
                            error={errors.email?.message}
                            {...register('email')}
                        />
                       
                        <Button type="submit">{isSubmitting ? 'Recuperando...' : 'Recuperar'}</Button>

                    </form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </AnimationContainer>
            </Content>

        </Container>
        </>
    );
};

export default ForgotPassword;