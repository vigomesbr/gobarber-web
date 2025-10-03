import React, { useCallback, type ChangeEvent } from "react";
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
    const { user, updateUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            old_password: '',
            new_password: '',
            password_confirmation: '',
        }
    });

    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleProfileUpdate: SubmitHandler<ProfileFormData> = useCallback(
        async (formData: ProfileFormData) => {
            try {
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    old_password: formData.old_password,
                    password: formData.new_password,
                };

                if (!formData.new_password) {
                    delete (payload as Partial<typeof payload>).password;
                    delete (payload as Partial<typeof payload>).old_password;
                }

                const response = await api.put('/profile/update', payload);

                updateUser(response.data.user);

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado!',
                    description: 'Suas informações foram atualizadas com sucesso.',
                });

                navigate('/dashboard');
            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro na atualização',
                    description: 'Ocorreu um erro ao atualizar o perfil, tente novamente.',
                });
            }
        },
        [updateUser, addToast, navigate],
    );

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = new FormData();
            data.append('avatar', e.target.files[0]);

            api.patch('/users/avatar', data).then(response => {
                const newUserObject = response.data.user;
                updateUser(newUserObject);
                addToast({
                    type: 'success',
                    title: 'Avatar atualizado',
                });
            });
        }
    }, [addToast, updateUser]);

    return (
        <>
            <Container>

                <header>
                    <div>
                        <Link to="/dashboard">
                            <FiArrowLeft />
                        </Link>

                    </div>
                </header>

                <Content>

                    <form onSubmit={handleSubmit(handleProfileUpdate)}>

                        <AvatarInput>
                            <img
                                src={user?.avatar_url
                                    ? `${user.avatar_url}?${new Date().getTime()}`
                                    : 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'
                                }
                                alt={user?.name}
                            />
                            <label htmlFor="avatar"><FiCamera />
                                <input type="file" id="avatar" onChange={handleAvatarChange} />
                            </label>
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