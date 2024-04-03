import CardMedia from '@mui/material/CardMedia';
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules

const PostMedia = ({image, video}: any) => {
  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
          el: '.swiper-pagination-bottom'
        }}
        loop
        navigation={true}
        modules={[Pagination, Navigation]}
        className='border border-stone-800 rounded-lg h-[80vh] select-none'
      >
        {image[0] !== null &&
          image.map((img: any, index: any) => (
            <SwiperSlide className='flex justify-center' key={index}>
              <div className='flex items-center'>
                <CardMedia
                  component='img'
                  sx={{
                    width: 'calc(-2px + min(470px, 100vw))',
                    boxSizing: 'border-box',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  image={img}
                  alt=''
                />
              </div>
            </SwiperSlide>
          ))}
        {video[0] !== null &&
          video.map((vdo: any, index: any) => (
            <SwiperSlide className='flex justify-center' key={index}>
              <CardMedia
                component='video'
                sx={{
                  width: 'calc(-2px + min(470px, 100vw))',
                  boxSizing: 'border-box'
                }}
                src={vdo}
                controls
                controlsList='nodownload'
                // autoPlay
                loop
                muted
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PostMedia;
