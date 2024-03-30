const ReelCard = () => {
  return (
    <div className='w-[15rem] px-2'>
      <video
        className='w-full h-full '
        src='https://cdn.pixabay.com/vimeo/925184511/ai-uoc-tao-ra-204767.mp4?width=720&hash=796e13b426d198f2e49e6a87f06341ef8ac585df'
        loop
        controls
      ></video>
    </div>
  );
};

export default ReelCard;
