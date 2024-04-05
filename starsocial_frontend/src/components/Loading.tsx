import {CircularProgress} from '@mui/material';

const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <CircularProgress sx={{color: 'white'}} />
    </div>
  );
};

export default Loading;
