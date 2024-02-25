import { useForm } from 'react-hook-form';
import { LoginPayload } from './types';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'contexts/ToastsContext/ToastsContext';
import { LOCAL_STORAGE_JWT_KEY } from 'constants';

export const useLoginForm = () => {
  const navigate = useNavigate();

  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmitLogin = (data: LoginPayload) => {
    if (data.password === 'admin' && data.username === 'admin') {
      localStorage.setItem(LOCAL_STORAGE_JWT_KEY, 'Dpo Access Token');
      navigate('/dashboard/projects');
    } else {
      addToast('Wrong username or password', 'error');
    }
  };

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return {
    onLogin: handleSubmit(onSubmitLogin),
    onLogout,
    errors,
    register,
  };
};
