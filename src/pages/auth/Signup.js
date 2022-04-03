import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import store from '../../app/store';
import { signup } from './authSlice';

export function Signup() {
  let navigate = useNavigate();
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is require')
      .min(3, 'Password must be at 3 char long'),
    confirm_password: Yup.string()
      .required('Password is require')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onRegister = async (data) => {
    let result = await store.dispatch(signup(data));
    if (result.payload.status === true) {
      NotificationManager.success(result.payload.message, 'SignIn Info');
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    } else {
      NotificationManager.error(result.payload.message, 'SignIn Info');
    }
    console.log('Log ~ onRegister ~ result', result.payload);
  };

  return (
    <div
      className='h-screen overflow-hidden flex items-center justify-center'
      style={{ background: '#edf2f7' }}
    >
      <div className='bg-grey-lighter min-h-screen flex flex-col'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <form
            className='bg-white px-6 py-8 rounded shadow-md text-black w-full'
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              placeholder='Full Name'
              {...register('name', {
                required: true,
                maxLength: 50,
              })}
            />
            {errors?.name?.type === 'required' && (
              <p className='text-red-600/100'>This field is required</p>
            )}
            <input
              type='email'
              placeholder='Email'
              {...register('email', {
                required: true,
                maxLength: 50,
              })}
              className='block border border-grey-light w-full p-3 rounded mb-4'
            />
            {errors?.email?.type === 'required' && (
              <p className='text-red-600/100'>This field is required</p>
            )}
            <input
              type='password'
              name='password'
              placeholder='Password'
              {...register('password')}
              className={`block border border-grey-light w-full p-3 rounded mb-4 ${
                errors.password ? 'focus:invalid:border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className='text-red-600/100'>{errors.password.message}</p>
            )}
            <input
              type='password'
              name='confirm_password'
              placeholder='Confirm Password'
              {...register('confirm_password')}
              className={`block border border-grey-light w-full p-3 rounded mb-4 ${
                errors.confirm_password ? 'focus:invalid:border-red-500' : ''
              }`}
            />
            {errors.confirm_password && (
              <p className='text-red-600/100'>
                {errors.confirm_password.message}
              </p>
            )}
            <input
              type='submit'
              onClick={handleSubmit(onRegister)}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto'
              value='Create Account'
            />

            <div className='text-center text-sm text-grey-dark mt-4'>
              By signing up, you agree to the
              <Link
                className='no-underline border-b border-grey-dark text-grey-dark'
                to='/'
              >
                Terms of Service
              </Link>{' '}
              and
              <Link
                className='no-underline border-b border-grey-dark text-grey-dark'
                to='/'
              >
                Privacy Policy
              </Link>
            </div>
          </form>

          <div className='text-grey-dark mt-6'>
            Already have an account?
            <Link
              className='no-underline border-b border-blue text-blue'
              to='/login'
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
