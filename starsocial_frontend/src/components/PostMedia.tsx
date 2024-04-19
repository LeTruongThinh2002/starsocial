import CardMedia from "@mui/material/CardMedia";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules

const PostMedia = ({ image, video }: any) => {
  return (
    <>
      <Swiper
        pagination={{
          type: "bullets",
        }}
        loop
        navigation={true}
        modules={[Pagination, Navigation]}
        className="rounded-lg h-full select-none"
      >
        {image[0] !== null &&
          image.map((img: any, index: any) => (
            <SwiperSlide className="flex justify-center " key={index}>
              <div className="flex items-center">
                <CardMedia
                  component="img"
                  className="object-center max-h-[80vh]"
                  width={"100%"}
                  image={img}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        {video[0] !== null &&
          video.map((vdo: any, index: any) => (
            <SwiperSlide className="flex justify-center" key={index}>
              <div className="flex items-center">
                <CardMedia
                  component="video"
                  src={vdo}
                  controls
                  controlsList="nodownload"
                  className="object-center max-h-[80vh] cursor-pointer"
                  // autoPlay
                  loop
                  muted
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PostMedia;
