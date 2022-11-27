import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth, AuthUserInfo } from '../../context/authContext';

interface RegisterFormUserInfo extends AuthUserInfo {
  passwordConfirm: string;
}

const Register = () => {
  const auth = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    watch,
  } = useForm<RegisterFormUserInfo>();
  const navigate = useNavigate();

  const onHandleSubmit: SubmitHandler<RegisterFormUserInfo> = async (data) => {
    console.log(data);

    try {
      await auth.register({ email: data.email, password: data.password });
      alert('User Created Successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('User created failed');
      alert(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        <label htmlFor="passwordConfirm">Confirm your password</label>
        <input
          type="password"
          id="passwordConfirm"
          autoComplete="off"
          required={true}
          {...register('passwordConfirm', {
            validate: (value) =>
              value === watch('password', '') || 'The passwords do not match',
          })}
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          onKeyUp={() => {
            trigger('passwordConfirm');
          }}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
