import { Header } from "../../components/header";
import {useEffect, useState} from "react";
import { Navbar } from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { getSearchVideo } from './videoSlice';
import store from "../../app/store";
import {
    useNavigate,
    useSearchParams,
  } from "react-router-dom";
  import {
    setVideo,
  } from "./videoSlice";
function Search(){
    let navigate = useNavigate();
    const [dataItem , setDateItem] = useState(false);
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();
    const handleClick = async (item) => {
        await store.dispatch(setVideo(item));
        navigate(`/videos/${item.id}`);
      };
      /* categoryId
: 
"626035fa9260c4b8d5ace9c2"
createdAt
: 
"2022-03-26T02:56:05.891Z"
id
: 
"623e80c5bc0e7e7f28fb768d"
name
: 
"Just a dream"
publicIdCloudinary
: 
"wzdo65wekjcqtx5kgylf"
publicIdCloudinaryThumb
: 
"t1mjcjup6reuo8da4obb"
url
: 
"https://res.cloudinary.com/niklab/video/upload/v1648263363/wzdo65wekjcqtx5kgylf.mp4"
urlThumb
: 
"https://res.cloudinary.com/niklab/image/upload/v1648263365/t1mjcjup6reuo8da4obb.jpg"
userId
: 
"6230ba348d6bcdaf6682071e"
views
: 
264*/
    
    //console.log(searchParams.get("key"))
    useEffect(() => {
       const getSearch = async () => {
        const response = await dispatch(getSearchVideo(searchParams.get("key")));
    //    console.log(response.payload);
        if (response.payload){
            setDateItem(response.payload);
        }
       }
       getSearch();
    }, [searchParams]);
    return( 
        <>
        <Header></Header>
        <main className="app-content-youtube container-fluid">
    <div className="app-container-fluid">
        <Navbar></Navbar>
        <div className="col col-ls-9 col-s-12 col-11 app-youtube-result">
             <div className="app-youtube-result-content">
                
                {dataItem && dataItem.map((data, key) => (

<div key={key} className="app-youtube-result-content-grid">

                
<div className="row">
   <div className="col col-s-4">
       <div className="app-youtube-result-content__image">
           <img src={data.urlThumb}   onClick={() => handleClick(data)} alt="" />
       </div>
   </div>
   <div className="col col-s-8">
        <div className="app-youtube-result-content__content">
         <div className="app-youtube-result-content__content-title">
           <a href=""> <b>{data.name}</b></a>
           <span>{data.views} lượt xem • {data.createdAt} </span>
         </div>
        
         <div className="app-youtube-result-content__channel">
             <div>
               <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo" alt=""/>
             </div>
             <div className="app-youtube-result-content__channel-name">
               <span>  {}{data.user.name}</span>
               <i className="fa fa-check-circle"></i>
             </div>
         </div>
         <div className="app-youtube-result-content__channel-name-thumbnail">
         <span>{data.description}.</span>
         </div>
       </div>
   </div>
</div>
</div>
                ))}      
             </div>
        </div>
    </div>
</main>
        </>
   );
}
export default Search;