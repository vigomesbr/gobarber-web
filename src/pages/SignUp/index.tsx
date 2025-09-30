import React, { useCallback }from "react";
import { Container, Content, Background, AnimationContainer } from './styles';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { signUpFormSchema, type SignUpFormData } from '../../schemas/signUpSchemas';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../services/apiClient";
import { useToast } from "../../hooks/toast";


const SignUp: React.FC = () => {

    const { 
        register,
        handleSubmit, 
        formState: { isSubmitting, errors } 
    } = useForm<SignUpFormData>({ 
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSignUp: SubmitHandler<SignUpFormData> = useCallback(async (data) => {
        try{
            await api.post('/users', data);

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber'
            })

            navigate('/'); 

        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.'
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
                        <h1>Faça seu cadastro</h1>
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
                        <Input 
                            icon={FiLock} 
                            type="password" 
                            placeholder="Senha"
                            error={errors.password?.message}
                            {...register('password')} 
                        />
                        <Button type="submit">{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}</Button>

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

export default SignUp;