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
              <Link to='/'>??????????????????</Link>
            </li>
            <li>
              <Link to='/'>???????????????</Link>
            </li>
            <li>
              <Link to='/'>??????????????????</Link>
            </li>
            <li>
              <Link to='/'>???????????????</Link>
            </li>
            <li>
              <Link to='/'>????????</Link>
            </li>
            <li>
              <Link to='/'>??????????????????</Link>
            </li>
            <li>
              <Link to='/'>???????????????</Link>
            </li>
            <li>
              <Link to='/'>Espa??ol</Link>
            </li>
            <li>
              <Link to='/'>Portugu??s (Brasil)</Link>
            </li>
            <li>
              <Link to='/'>Fran??ais (France)</Link>
            </li>
           
            </ol>
            <small>Facebook ?? 2022</small>
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
                             <span className="app-register-form__title-create" >????ng nh???p</span>
                             <span className="app-register-form__title-continue">Ti???p t???c t???i Gmail</span>
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
                <span className="error-form"> * B???t bu???c nh???p</span>
              )}
              {errors?.email?.type === 'maxLength' && (
                  <span className="error-form"> * Email kh??ng h???p l???</span>
              )}
                                
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col col-s-12">
                                   <div className="form-text ">
                                    <label>M???t kh???u</label>
                                    <input 
                                     {...register('password', {
                                      required: true,
                                      maxLength: 20,
                                      minLength: 8,
                                    })}
                                    type="password" placeholder="M???t kh???u"/>
                                   
                                   </div>
    
                                </div>
                                {errors?.password?.type === 'required' && (
                <span className="error-form"> * B???t bu???c nh???p</span>
              )}
              {errors?.password?.type === 'minLength' && (
                <span className="error-form"> * M???t kh???u ph???i ??t nh???t 8 k?? t???</span>
              )}
              {errors?.password?.type === 'maxLength' && (
                 <span className="error-form"> * M???t kh???u kh??ng ???????c qu?? 20 k?? t???</span>
              )}
                              
                            </div>
                        </div>
                        
                      
                        
                        <div className="submit-button">
                            <div className="row">
                                 <div className="col col-s-6 col-mb-6">
                                    <div className="submit-button__login">
                                       <Link to="/register"> <button>B???n ch??a c?? t??i kho???n ?</button></Link>
                                    </div>
                                 </div>
                                 <div className="col col-s-6 col-mb-6">
                                    <div className="submit-button__next">
                                        <button    onClick={handleSubmit(onLogin)} >????ng nh???p</button>
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
