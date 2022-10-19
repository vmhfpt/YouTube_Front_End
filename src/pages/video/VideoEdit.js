import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/header";
import {
  getVideosByUserId,
  deleteVideoByVideoId,
  setVideo,

} from "./videoSlice";
import { NotificationManager } from "react-notifications";

import store from "../../app/store";
import EditVideo from "../../components/EditVideo";
export function VideoEdit() {
  let navigate = useNavigate();
  const videoState = useSelector((state) => state.videos);
  const authState = useSelector((state) => state.auth);

  const [statusEdit, setStatusEditVideoNameValue] = useState(false);


  

  async function fetchData() {
    const token = `Bearer ${authState.accessToken}`;
    await store.dispatch(getVideosByUserId(token));
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (item) => {
    await store.dispatch(setVideo(item));
    navigate(`/videos/${item.id}`);
  };

  const onDelete = async (item) => {
    const confirm = window.confirm('Bạn có chắc xóa không ?')
    if(confirm){
      const video = {
        videoId: item.id,
        token: `Bearer ${authState.accessToken}`,
      };
      const result = await store.dispatch(deleteVideoByVideoId(video));
      if (result.payload.success) {
        NotificationManager.success(result.payload.message, "Delete video info");
        fetchData();
      }
    }
    
  };

  const onEditVideoName = async (item) => {
    setStatusEditVideoNameValue(item);
  
   
  };

 
 

  
  /** return (
    <div classNameName="container mx-auto">
      <Navbar></Navbar>
      <div>
        <div style={{ position: "relative" }}>
          {" "}
          {statusEdit && (
            <div style={{ position: "absolute", right: "50%" }}>
              <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="newVideoName"
                    >
                      Enter new video name
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="newVideoName"
                      type="text"
                      placeholder=""
                      {...register("content_video_edit", {
                        required: true,
                        maxLength: 200,
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSubmit(onConfirmEditVideoName)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => onCancelEditVideoName()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div classNameName="grid md:grid-cols-3 gap-4 sm:grid-cols-1">
        {videoState.videos?.map((item) => (
          <div
            key={item.id}
            style={{ display: "inline-block" }}
            classNameName="px-3"
          >
            <img
              classNameName="rounded-lg"
              src={item.urlThumb}
              alt="null"
              width="100%"
              height="auto"
              onClick={() => handleClick(item)}
            ></img>
            <div classNameName="gap-1 sm:grid-cols-2">
              <div id={item.id} value={item}>
                <h4 className="font-bold">{item.name}</h4>
                <span>{item.user.name}</span>{" "}
                <span className="italic">{item.views} views</span>
              </div>
              <div className="inline-flex">
                <button
                  onClick={() => onEditVideoName(item)}
                  classNameName="bg-green-500 hover:bg-green-600 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item)}
                  classNameName="bg-red-500 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );*/

return (<>
{statusEdit && <EditVideo data={statusEdit} tabEdit={setStatusEditVideoNameValue}/>}
<Header></Header>

<main className="app-content-youtube container-fluid">
  <div className="app-container-fluid">
     <Navbar></Navbar>
      <div className="col col-ls-10 col-s-12 col-11">
          <div className="app-content-youtube__detail-edit-video">


             
              <div className="app-content-youtube__detail-list app-container-fluid">
                  <div className="app-youtube-manage__title">
                      <h2>Nội dung của kênh</h2>
                  </div>
                  <div className="app-youtube-manage__title-tab">
                      <ul>
                          <li className="app-youtube-manage__title-tab-active">
                              Video
                          </li>
                          <li>
                              Trực tiếp
                          </li>
                      </ul>
                  </div>
                  <div className="app-youtube-manage__title-sort">
                      <ul>
                          <li >
                              <i className="fa fa-sort" aria-hidden="true"></i>
                          </li>
                          <li>
                              Lọc
                          </li>
                      </ul>
                  </div>
                  <div className="app-youtube-manage__table">
                    <div className="app-youtube-manage__table-header">
                      <div className="cell-1">
                          <input type="checkbox" />
                      </div>
                      <div className="cell-2">
                           Video
                      </div>
                      <div className="table-mobile__over-flow">
                          <div className="table-mobile__over-flow-content">
                              <div className="cell-3">
                                  Chế độ hiển thị
                              </div>
                              <div className="cell-4">
                                  Hạn chế
                              </div>
                              <div className="cell-5">
                                  Ngày
                              </div>
                              <div className="cell-6">
                                  Số lượt xem
                              </div>
                              <div className="cell-7">
                                  Số bình luận
                              </div>
                              <div className="cell-8">
                                  Lượt thích
                              </div>
                          </div>
                         
                      </div>
                      
                    
                    </div>
                    <div className="app-youtube-manage__table-content-over-flow">
                      




                 


                        {videoState.videos?.map((item) => (
         <div    key={item.id} className="app-youtube-manage__table-content">
         <div className="cell-1">
             <input type="checkbox" />
         </div>
         <div className="cell-2">
             <div className="row">
                 <div className="col col-s-4">
                      <div className="table-image">
                          <img   src={item.urlThumb} alt="" />
                      </div>
                 </div>
                 <div className="col col-s-8">
                     <div className="table-detail">
                         <span> {item.name}</span>
                         <span>" CẢM ƠN CÁC BẠN ĐÃ QUAN TÂM THEO GIÕI VIDEO "
                             " CHÚC CÁC BẠN MỘT NGÀY TỐT LÀNH "
                             link Acode : https://drive.google.com/file/d/1-9ZLLtdV-UXlOCVVMu8zn6vQePljrrOi/view?</span>
                             <div className="tab-handle-table__detail">
                                  <ul>
                                     <li  onClick={() => onEditVideoName(item)}><i className="fa fa-pencil" aria-hidden="true"></i></li>
                                     <li  onClick={() => handleClick(item)}><i className="fa fa-youtube-play" aria-hidden="true"></i></li>
                                     <li onClick={() => onDelete(item)}><i className="fa fa-trash" aria-hidden="true"></i></li>
                                  </ul>
                             </div>
                     </div>
                 </div>
             </div>
         </div>
         <div className="table-mobile__over-flow">
             <div className="table-mobile__over-flow-content">
                 <div className="cell-3">
                     <i className="fa fa-eye" aria-hidden="true"></i> Công khai
                 </div>
                 <div className="cell-4">
                     Không có
                 </div>
                 <div className="cell-5">
                     <span>{item.createdAt}
                     </span>
                     <p> Đã xuất bản</p>
                 </div>
                 <div className="cell-6">
                 {item.views}
                 </div>
                 <div className="cell-7">
                     1200N
                 </div>
                 <div className="cell-8">
                      <span>100%</span>
                      <p>{item.views} lượt thích</p>
                 </div>
             </div>
            
         </div>
         
       <div className="clear-both"></div>
       </div>
        ))}        
                    </div>
                   


                  </div>
              </div>



          </div>
      </div>
  </div>
</main>
</>)
}
