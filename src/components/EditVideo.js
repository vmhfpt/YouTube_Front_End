import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useState} from "react";
import { useSelector } from "react-redux";
import store from "../app/store";
import { NotificationManager } from "react-notifications";
import {updateVideoName, updateVideoNameReducer} from "../pages/video/videoSlice";

function EditVideo({tabEdit, data}){
 
   const [name, setName] = useState(data.name);
   
    const authState = useSelector((state) => state.auth);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm();
      useEffect(() => {
        setValue("content_video_edit", data.name);
      }, [data])
      const onConfirmEditVideoName = async (dataUpload) => {
        
       const videoEdit = {
          videoId: data.id,
          videoName: dataUpload.content_video_edit,
          token: `Bearer ${authState.accessToken}`,
        };
        const result = await store.dispatch(updateVideoName(videoEdit));
        if (result.payload.success) {
          NotificationManager.success(
            result.payload.message,
            "Update video name info"
          );
       
          store.dispatch(updateVideoNameReducer(videoEdit));
          tabEdit(false);
        } 
      };
    return(<div className="upload-video-popup" >
    <div className="upload-video-popup__content">
          <div className="app-container-fluid">
             <div className="upload-video-popup__content-first">
                 <div className="row">
                    <div className="col col-ms-6 col-s-6 col-mb-6">
                        <div className="upload-video-popup__content-first-name">
                            <span>Sửa video {data.name} </span>
                        </div>
                    </div>
                    <div className="col col-ms-6 col-s-6 col-mb-6">
                        <div className="upload-video-popup__content-first-title">
                             <span>Đã lưu ở chế độ riêng tư</span>
                             <i onClick={() => tabEdit(false)} className="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                 </div>
                    
             </div>
             <div className="upload-video-popup__content-second">
                <div className="row">
                    <div className="col col-ms-7 col-s-7">
                        <div className="upload-video-popup__content-set">
                           <div className="row">
                               <div className="col col-ms-6 col-mb-6 col-6">
                                    <span className="upload-video-popup__content-second-span-title" >Chi tiết</span>
                               </div>
                               <div className="col col-ms-6 col-mb-6 col-6">
                                <span className="upload-video-popup__content-second-span-alert" >DÙNG LẠI THÔNG TIN</span>
                            </div>
                           </div>
                        </div>
                    </div>
                    <div className="col col-ms-7 col-s-7">
                        <div className="upload-video-popup__content-set">
                            <div className="upload-video-popup__content-set-over-flow">
                                <div className="form-group">
                                    <div className="form-text">
                                        <label>Tiêu đề (bắt buộc)</label>
                                        <input {...register("content_video_edit", {
                        required: true,
                        maxLength: 200,
                      })} id="idnamevideo" type="text"  onChange={(e) => setName(e.target.value)} value={name} placeholder="Thêm tiêu đề để mô tả video của bạn (nhập ký tự @ để đề cập tên một kênh)" />
                                    </div>
                                </div>
  
                                <div className="form-group">
                                    <div className="form-text">
                                     
                                        <label>Mô tả (bắt buộc)</label>
                                        <input disabled={true} id="textarea" type="text" placeholder="Giới thiệu về video của bạn cho người xem (nhập ký tự @ để đề cập tên một kênh)" />
                                    </div>
                                </div>
                               
                                <div className="form-image">
                                    <div className="form-image-title">
                                        <div className="form-image-title-span">
                                            <span>Hình thu nhỏ</span>
                                        </div> 
                                        <p>Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và thu hút người xem. <a href="">Tìm hiểu thêm</a></p>
                                    </div>
                                    <div className="form-image-content">
                                         <div className="row">
                                            
                                            
                                            <div className="col col-ms-4 col-s-6">
                                                <div className="form-image-content__list">
                                                  <img src={data.urlThumb} alt="" />
                                                </div>
                                            </div>
                                         </div>
                                    </div>
  
                                    
                                </div>
                                <div className="form-image">
                                    <div className="form-image-title">
                                        <div className="form-image-title-span">
                                            <span>Danh mục</span>
                                        </div> 
                                        <p>Thêm video của bạn vào một danh mục để người xem dễ dàng tìm thấy hơn. <a href="">Tìm hiểu thêm</a></p>
                                    </div>
                                    <div className="form-image-content">
                                        <div className="form-select">
                                        <select id="myCategory">
            
          </select>
                                        </div>
                                    </div>
                                    <span> Coming soon </span>
                                   
  
          
                                </div>
                            </div>
                          
                           
                        </div>
                    </div>
                    <div className="col col-ms-5 col-s-5">
                       <div className="upload-video-popup__content-set-video"> 
                           <div className="upload-video-popup__content-set-video-suggest">
                            <video id="video-element" width="100%" height="140" controls>
                                <source src={data.url} />
                                
                                Your browser does not support the video tag.
                              </video>
                           </div>
                           <div className="upload-video-popup__content-set-video-detail">
                              <div className="row">
                                 <div className="col col-ms-11 col-s-11 col-mb-11">
                                     <div className="upload-video-popup__content-set-video-detail-link">
                                        <span>Đường liên kết của video</span>
                                        <a href={data.url}> {data.url}</a>
                                     </div>
                                
                                 </div>
                                 <div className="col col-ms-1 col-s-1 col-mb-1">
                                    <div className="upload-video-popup__content-set-video-detail-copy">
                                        <i className="fa fa-clone" aria-hidden="true"></i>
                                     </div>
                                  
                                </div>
                                <div className="col col-ms-12 ">
                                    <div className="upload-video-popup__content-set-video-detail-name-file">
                                        <span>Tên tệp</span>
                                        <p>dtiemetyyvideo.mp4</p>
                                    </div>
                                  
                                </div>
                              </div>
                           </div>
                       </div>
                    </div>
                 
                </div>
             </div>
             <div>
  
             </div>
  
          </div>
          <div className="upload-video-popup__content-first">
                 <div className="row">
                    <div className="col col-ms-6 col-s-6 col-mb-6">
                       
                    </div>
                    <div className="col col-ms-6 col-s-6 col-mb-6">
                        <div className="upload-video-popup__content-first-title">
                        <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4"
            id="confirm"
            onClick={handleSubmit(onConfirmEditVideoName)}
          >
            Lưu lại
          </button>
                        </div>
                    </div>
                 </div>
                    
             </div>
    </div>
  
  </div>);
}
export default EditVideo;