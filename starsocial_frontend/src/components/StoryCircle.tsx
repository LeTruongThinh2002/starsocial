import {Add} from '@mui/icons-material';
import {Avatar} from '@mui/material';

const StoryCircle = () => {
  return (
    <div className='flex flex-col items-center mr-4 cursor-pointer'>
      <Avatar
        sx={{width: '4rem', height: '4rem'}}
        src='https://i.postimg.cc/HsNS3tY3/image.jpg'
      >
        <Add sx={{fontSize: '3rem'}} />
      </Avatar>
      <p>New</p>
    </div>
  );
};

export default StoryCircle;
