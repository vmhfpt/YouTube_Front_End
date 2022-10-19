import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import {useState} from "react";
import store from '../../app/store';
import { login, setUser } from './authSlice';
import Google from "./Layer 1.png";
import { NotificationManager } from 'react-notifications';
export function Login() {

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    let result = await store.dispatch(login(data));
    if (result.payload.status === true) {
      store.dispatch(
        setUser({
          user: result.payload.user,
          isLogin: true,
          accessToken: result.payload.accessToken,
        })
      );
      NotificationManager.success(result.payload.message, 'Login Info');
      
    
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } else {
      

      NotificationManager.error(result.payload.message, 'Login Info');
    }
    console.log('Log ~ onLogin ~ result', result.payload);
  };

  
  /* return (
    <div>
      <main>
        <div classNameName={styles.row}>
          <div classNameName={styles.colm_logo}>
            <img
              src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'
              alt='Logo'
            />
            <h2>
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div classNameName={styles.colm_form}>
            <form classNameName={styles.form_container}>
              <input
                type='text'
                placeholder='Email address or phone number'
                {...register('email', {
                  required: true,
                  maxLength: 50,
                })}
              />
              {errors?.email?.type === 'required' && (
                <p classNameName='text-red-600/100'>This field is required</p>
              )}
              {errors?.email?.type === 'maxLength' && (
                <p classNameName='text-red-600/100'>
                  First name cannot exceed 50 characters
                </p>
              )}
              <input
                type='password'
                placeholder='Password'
                {...register('password', {
                  required: true,
                  maxLength: 20,
                  minLength: 8,
                })}
              />
              {errors?.password?.type === 'required' && (
                <p classNameName='text-red-600/100'>This field is required</p>
              )}
              {errors?.password?.type === 'minLength' && (
                <p classNameName='text-red-600/100'>at lest 8 characters</p>
              )}
              {errors?.password?.type === 'maxLength' && (
                <p classNameName='text-red-600/100'>
                  Field cannot exceed 20 characters
                </p>
              )}
              <input
                type='submit'
                onClick={handleSubmit(onLogin)}
                classNameName={styles.btn_login}
                value='Login'
              />
              <Link to='/'>Forgotten password?</Link>
              <input
                type='submit'
                onClick={() => {
                  navigate(`/register`);
                }}
                classNameName={styles.btn_new}
                value='Create new Account'
              />
            </form>
            <p>
              <Link to=''>
                <b>Create a Page</b>
              </Link>{' '}
              for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </main>
      <footer>
        <div classNameName={styles.footer_contents}>
          <ol>
            <li>English (UK)</li>
            <li>
              <Link to='/'>മലയാളം</Link>
            </li>
            <li>
              <Link to='/'>தமிழ்</Link>
            </li>
            <li>
              <Link to='/'>తెలుగు</Link>
            </li>
            <li>
              <Link to='/'>বাংলা</Link>
            </li>
            <li>
              <Link to='/'>اردو</Link>
            </li>
            <li>
              <Link to='/'>हिन्दी</Link>
            </li>
            <li>
              <Link to='/'>ಕನ್ನಡ</Link>
            </li>
            <li>
              <Link to='/'>Español</Link>
            </li>
            <li>
              <Link to='/'>Português (Brasil)</Link>
            </li>
            <li>
              <Link to='/'>Français (France)</Link>
            </li>
           
            </ol>
            <small>Facebook © 2022</small>
          </div>
        </footer>
      </div>
    ); */
    return (<div className="container-fluid-google">
    <div className="container-google-login">
        <div className="row">
            <div className="col col-s-12">
                 <div className="app-register-form app-register-form-login">
                         <div className="app-register-form__title app-register-form__title-login col-s-12">
                             <div className="app-register-form__title-login-image">
                                <img  src={Google} alt=""/>
                             </div>
                             <span className="app-register-form__title-create" >Đăng nhập</span>
                             <span className="app-register-form__title-continue">Tiếp tục tới Gmail</span>
                         </div>
                         <div className="clear-both"></div>
                    <form className="form-google-handle" action="" method="POST">
                         
                         <div className="form-group">
                            <div className="row">
                                <div className="col col-s-12">
                                   <div className="form-text ">
                                    <label>Email</label>
                                    <input 
                                     {...register('email', {
                                      required: true,
                                      maxLength: 50,
                                    })}
                                    type="text" placeholder="Email"/>
                                   
                                   </div>
    
                                </div>
                                {errors?.email?.type === 'required' && (
                <span className="error-form"> * Bắt buộc nhập</span>
              )}
              {errors?.email?.type === 'maxLength' && (
                  <span className="error-form"> * Email không hợp lệ</span>
              )}
                                
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col col-s-12">
                                   <div className="form-text ">
                                    <label>Mật khẩu</label>
                                    <input 
                                     {...register('password', {
                                      required: true,
                                      maxLength: 20,
                                      minLength: 8,
                                    })}
                                    type="password" placeholder="Mật khẩu"/>
                                   
                                   </div>
    
                                </div>
                                {errors?.password?.type === 'required' && (
                <span className="error-form"> * Bắt buộc nhập</span>
              )}
              {errors?.password?.type === 'minLength' && (
                <span className="error-form"> * Mật khẩu phải ít nhất 8 ký tự</span>
              )}
              {errors?.password?.type === 'maxLength' && (
                 <span className="error-form"> * Mật khẩu không được quá 20 ký tự</span>
              )}
                              
                            </div>
                        </div>
                        
                      
                        
                        <div className="submit-button">
                            <div className="row">
                                 <div className="col col-s-6 col-mb-6">
                                    <div className="submit-button__login">
                                       <Link to="/register"> <button>Bạn chưa có tài khoản ?</button></Link>
                                    </div>
                                 </div>
                                 <div className="col col-s-6 col-mb-6">
                                    <div className="submit-button__next">
                                        <button    onClick={handleSubmit(onLogin)} >Đăng nhập</button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </form>
                       
                 </div>
            </div>
           
    </div>
</div>
</div>);
}
