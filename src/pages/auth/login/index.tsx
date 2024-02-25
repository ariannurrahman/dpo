import './style.scss';

import { useLoginForm } from './useLoginForm';

export const LoginPage = () => {
  const { onLogin, register, errors } = useLoginForm();

  return (
    <section id='login-page' className='p-3 p-md-5 shadow-lg border rounded login-page-container'>
      <h1 className='text-center mb-3'>Welcome Back!</h1>
      <form onSubmit={onLogin}>
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='username'
            placeholder='insert admin'
            {...register('username', { required: 'Username is required' })}
          />
          {<p className='text-danger mt-1'>{errors['username']?.message}</p> ?? null}
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            aria-describedby='passwordHelp'
            {...register('password', { required: 'Password is required' })}
          />
          <div id='passwordHelp' className='form-text'>
            Insert admin too :)
          </div>
          {<p className='text-danger mt-1'>{errors['password']?.message}</p> ?? null}
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Submit
        </button>
      </form>
    </section>
  );
};
