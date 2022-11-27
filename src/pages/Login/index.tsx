import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth, AuthUserInfo } from '../../context/authContext';

const Login = () => {
  const auth = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
  } = useForm<AuthUserInfo>();
  const navigate = useNavigate();

  const onHandleSubmit: SubmitHandler<AuthUserInfo> = async (data) => {
    console.log(data);
    try {
      await auth.login({ email: data.email, password: data.password });
      alert('Login Successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Login failed');
      alert(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required={true}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              // value: /^[A-Z0-9._%+-]+@imlabworld.com$/i,
              message: 'invalid Email.',
            },
          })}
          onKeyUp={() => {
            trigger('email');
          }}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          required={true}
          {...register('password', {
            required: 'password is required.',
            minLength: {
              value: 8,
              message: 'Password must be more than 8 characters',
            },
            maxLength: {
              value: 16,
              message: 'Password must be less than 16 characters',
            },
          })}
          onKeyUp={() => {
            trigger('password');
          }}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
