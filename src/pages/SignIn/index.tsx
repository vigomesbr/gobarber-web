import React, { useCallback } from "react";
import { Container, Content, Background, AnimationContainer } from './styles';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { signInFormSchema, type SignInFormData } from '../../schemas/signInSchemas';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const { 
        register,
        handleSubmit, 
        formState: { isSubmitting, errors } 
    } = useForm<SignInFormData>({ 
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleSignIn: SubmitHandler<SignInFormData> = useCallback(async (data) => {
        try {    
            await signIn({
                email: data.email,
                password: data.password
            })
        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorrou um erro ao fazer login, cheque as credenciais.'
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
                        <h1>Faça seu logon</h1>

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
                        <Button type="submit">{isSubmitting ? 'Entrando...' : 'Entrar'}</Button>

                        <a href="#">Esqueci minha senha</a>
                    </form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
        </>
    );
}

export default SignIn;