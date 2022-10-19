import logo from './logo.png'; 
import { Link } from 'react-router-dom';
import {  useNavigate,  useSearchParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { useState } from 'react';
import store from "../app/store";
import { removeUser } from "../pages/auth/authSlice";
import UploadVideo from './UploadVideo';
import { useDispatch } from 'react-redux';
import { getSearchVideo } from '../pages/video/videoSlice';
import {
  setVideo,
} from "../pages/video/videoSlice";

export function Header() {
  const [showNavbar, setShowNavBar] = useState(false);
   
  const dispatch = useDispatch();
  const [autoComplete, setAutoComplete] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [key, setKey] = useState(() => {
    return searchParams.get("key");
  });
  const [tabUpload, setTabUpload] = useState(false);
    let navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const onLogout = async (data) => {
    store.dispatch(removeUser());
    NotificationManager.success("Logout success", "Logout Info");
    setTimeout(() => {
      navigate(`/`);
    }, 2000);
  };
  const handleClick = async (item) => {
    await store.dispatch(setVideo(item));
    navigate(`/videos/${item.id}`);
    window.location.reload();
  };
  const setKeySearch = async (key) => {
     setKey(key);
     const response = await dispatch(getSearchVideo(key));
     if(response.payload.length <= 0){
      setAutoComplete(false);
     }else {
      setAutoComplete(response.payload);
     }
     
  }
    return (<header className="container-fluid">


    {tabUpload && <UploadVideo setTabUpload={setTabUpload} />
}




    <div className="app-header-youtube">
        <div className="row">
            <div className="col col-ls-4 col-s-3 col-mb-5">
                <div className="app-header-youtube__logo">
                    <div  className="app-header-youtube__logo-icon"><i className="fa fa-bars" aria-hidden="true"></i></div>
                    <Link to="/"><div  className="app-header-youtube__logo-img">
                        <img src={logo} alt="" />
                    </div></Link>
                </div>
  
            </div>
            <div className="col col-ls-4   col-s-6 col-mb-3">
                <div className="app-header-youtube__search">
                    <div className="app-header-youtube__search-input">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input 
                        value={key}
                        onChange={(e) => setKeySearch(e.target.value)}
                        type="text" placeholder="Tìm kiếm" />
                        <i className="fa fa-keyboard-o" aria-hidden="true"></i>
  
                    </div>
                   
                    <div className="app-header-youtube__search-icon">
                    <Link to={"/search?key=" + key } onClick={() => setAutoComplete(false)}> <i className="fa fa-search" aria-hidden="true"></i></Link>
                       
                    </div>
                    {autoComplete &&   
                    
                       <div className="app-header-youtube__search-auto-complete">
                         
                          <ul>
                          {autoComplete.map((data,key) =>(
                                <li key={key}  onClick={() => handleClick(data)}><i class="fa fa-search" aria-hidden="true"></i> {data.name} </li>
                              ))}
                          
                           
                          </ul>

                    </div>}
                  
                </div>
            </div>
            <div className="col col-ls-4   col-s-3 col-mb-4">
                <div className="app-header-youtube__user">


                  
            {authState.isLogin && (
              
              
              <div onClick={() => setTabUpload(!tabUpload)} className="app-header-youtube__user-item">
              <i className="fa fa-video-camera"></i>
          </div>
            
            )}



                    <div className="app-header-youtube__user-item">
                        <i className="fa fa-bell-o"></i>
                    </div>
                    <div className="app-header-youtube__user-item app-header-youtube__user-item-show">
                        <div className="app-header-youtube__user-image">
                            <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo"
                                alt="" />
                        </div>
                        <div className="app-header-youtube__user-content">
                             <div className="app-header-youtube__user-content-convert">
                                <div className="app-header-youtube__user-content-convert-left">
                                   <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo" alt="" />
                                </div>
                                <div className="app-header-youtube__user-content-convert-right">
                                   <b> {authState.isLogin ? `Hi ${authState.user.name}` : "Bạn chưa đăng nhập"}</b>
                                   <a href="#">Quản lý tài khoản Google của bạn</a>
                                </div>
                                <div className="clear-both"></div>
                                
                             </div>
                             <div className="app-header-youtube__user-content-list">
                                
                                   

                                   {authState.isLogin && (
              
              <div className="app-header-youtube__user-content-list-item">
                                    <div className="app-header-youtube__user-content-list-item-icon">
                                        <i className="fa fa-area-chart"></i>
                                    </div>
                                      <Link to="/my-channel"><span>Kênh của bạn</span></Link>
                                   </div>
          
          )}







                                  

                                   {!authState.isLogin && (
            
                <Link
                  to="/register"
                >
                 <div className="app-header-youtube__user-content-list-item">
                                    <div className="app-header-youtube__user-content-list-item-icon">
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                    </div>
                                      <span>Đăng Ký</span>
                                   </div>
                </Link>
              
            )}
            {!authState.isLogin && (
           
                <Link
                  to="/login"
                
                >
                 <div className="app-header-youtube__user-content-list-item">
                                    <div className="app-header-youtube__user-content-list-item-icon">
                                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    </div>
                                      <span>Đăng nhập</span>
                                   </div>
                </Link>
              
            )}

            {authState.isLogin && (
              
                <Link
                  onClick={() => onLogout()}
                  to="/"
              
                >
                   <div className="app-header-youtube__user-content-list-item">
                                    <div className="app-header-youtube__user-content-list-item-icon">
                                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    </div>
                                      <span >Đăng xuất</span>
                                   </div>
                </Link>
            
            )}
                                 
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </header>);
}
