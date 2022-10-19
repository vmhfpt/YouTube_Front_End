import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NotificationManager } from 'react-notifications';
import Google from "./Layer 1.png";
import store from '../../app/store';
import { signup } from './authSlice';
import { useState} from "react";

export function Signup() {
  const [showPassWord, setShowPassWord] = useState(false);
  let navigate = useNavigate();
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('name is require')
      .min(3, 'Name must be at 3 char long'),
    email: Yup.string().required('email is require'),
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

  
  /* return (
    <div
      classNameName='h-screen overflow-hidden flex items-center justify-center'
      style={{ background: '#edf2f7' }}
    >
      <div classNameName='bg-grey-lighter min-h-screen flex flex-col'>
        <div classNameName='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <form
            classNameName='bg-white px-6 py-8 rounded shadow-md text-black w-full'
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 classNameName='mb-8 text-3xl text-center'>Sign up</h1>
            <input
              type='text'
              name='name'
              classNameName='block border border-grey-light w-full p-3 rounded mb-4'
              placeholder='Full Name'
              {...register('name')}
            />
            {errors?.name?.type === 'required' && (
              <p classNameName='text-red-600/100'>Name is require</p>
            )}
            <input
              type='email'
              name='email'
              placeholder='Email'
              {...register('email')}
              classNameName='block border border-grey-light w-full p-3 rounded mb-4'
            />
            {errors?.email?.type === 'required' && (
              <p classNameName='text-red-600/100'>Email is required</p>
            )}
            <input
              type='password'
              name='password'
              placeholder='Password'
              {...register('password')}
              classNameName={`block border border-grey-light w-full p-3 rounded mb-4 ${
                errors.password ? 'focus:invalid:border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p classNameName='text-red-600/100'>{errors.password.message}</p>
            )}
            <input
              type='password'
              name='confirm_password'
              placeholder='Confirm Password'
              {...register('confirm_password')}
              classNameName={`block border border-grey-light w-full p-3 rounded mb-4 ${
                errors.confirm_password ? 'focus:invalid:border-red-500' : ''
              }`}
            />
            {errors.confirm_password && (
              <p classNameName='text-red-600/100'>
                {errors.confirm_password.message}
              </p>
            )}
            <input
              type='submit'
              onClick={handleSubmit(onRegister)}
              classNameName='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto'
              value='Create Account'
            />

            <div classNameName='text-center text-sm text-grey-dark mt-4'>
              By signing up, you agree to the
              <Link
                classNameName='no-underline border-b border-grey-dark text-grey-dark'
                to='/'
              >
                Terms of Service
              </Link>{' '}
              and
              <Link
                classNameName='no-underline border-b border-grey-dark text-grey-dark'
                to='/'
              >
                Privacy Policy
              </Link>
            </div>
          </form>

          <div classNameName='text-grey-dark mt-6'>
            Already have an account?
            <Link
              classNameName='no-underline border-b border-blue text-blue'
              to='/login'
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );*/
  return ( <div className="container-fluid-google">
  <div className="container-google">
      <div className="row">
          <div className="col col-ms-7">
               <div className="app-register-form">
                       <div className="app-register-form__title col-s-12">
                           <img  src={Google} alt=""/>
                           <span className="app-register-form__title-create" >Tạo Tài Khoản Google</span>
                           <span className="app-register-form__title-continue">Tiếp tục tới Gmail</span>
                       </div>
                       <div className="clear-both"></div>
                  <form className="form-google-handle"  onSubmit={(e) => e.preventDefault()}>
                       <div className="form-group">
                           <div className="row">
                               <div className="col col-s-6">
                                  <div className="form-text">
                                      <label>Họ</label>
                                      <input 
                                      disabled = "disabled"
                                      type="text" placeholder="Họ"/>
                                  </div>
                               </div>
                               <div className="col col-s-6">
                                  <div className="form-text ">
                                      <label>Tên</label>
                                      <input {...register('name')} type="text" placeholder="Tên"/>
                                  </div>
                               </div>
                               {errors?.name?.type === 'required' && (
              <span className="error-form"> * Tên không được để trống</span>
            )}
                              
                           </div>
                       </div>
                       <div className="form-group">
                          <div className="row">
                              <div className="col col-s-12">
                                 <div className="form-text ">
                                  <label>Email</label>
                                  <input  {...register('email')} type="email" placeholder="Email"/>
                                 
                                 </div>
  
                              </div>
                              {errors?.email?.type === 'required' && (
             <span className="error-form"> * Email không được để trống</span>
            )}
                             
                          </div>
                      </div>
                      
                      <div className="form-group">
                          <div className="row">
                              <div className="col col-s-6">
                                 <div className="form-text">
                                  <label>Mật khẩu</label>
                                  <input   {...register('password')} type={showPassWord ? "text" : "password"} placeholder="Mật khẩu"/>
                                 </div>
                              </div>
                              <div className="col col-s-6">
                                 <div className="form-text ">
                                  <label>Xác nhận</label>
                                  <input    {...register('confirm_password')} type={showPassWord ? "text" : "password"} placeholder="Xác nhận"/>
                                 </div>
                              </div>
                              <div className="clear-both"></div>
                              {errors.password && (
                                 <span className="error-form"> * {errors.password.message}</span>

            )}
             {errors.confirm_password && (
              <span className="error-form">
              *  {errors.confirm_password.message}
              </span>
            )}
                             
                             
                          </div>
                      </div>
                      <div className="form-group">
                          <div className="row">
                              <div className="col col-s-6">
                                 <div className="form-checkbox">
                                     <input onChange={() => setShowPassWord(!showPassWord)} type="checkbox" /> <label > Hiện mật khẩu</label>
                                 </div>
                              </div>
                          </div>
                      </div>
                      <div className="submit-button">
                          <div className="row">
                               <div className="col col-s-6 col-mb-6">
                                  <div className="submit-button__login">
                                     <Link to="/login"> <button type="button" >Đăng nhập</button></Link>
                                  </div>
                               </div>
                               <div className="col col-s-6 col-mb-6">
                                  <div className="submit-button__next">
                                      <button 
                                       
                                       onClick={handleSubmit(onRegister)}
                                      type="submit">Đăng ký</button>
                                  </div>
                               </div>
                          </div>
                      </div>
                  </form>
                     
               </div>
          </div>
          <div className="col col-ms-5">
               <div className="app-register-service-center">
                  <div className="app-register-service-center-vertically">
                      <div className="app-register-service">
                          <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" />
                  </div>
                  <div className="app-register-service">
                     <span>Một tài khoản. Hoạt động trên mọi sản phẩm và dịch vụ của Google.</span>
              </div>
                  </div>
               </div>
      </div>
  </div>
</div>
</div>);
}
