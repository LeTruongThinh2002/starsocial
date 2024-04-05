import {AddIcCall, Image, VideoCall, West} from '@mui/icons-material';
import {Avatar, Grid, IconButton} from '@mui/material';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import ChatMessage from '../../components/ChatMessage';
import ChatUserCard from '../../components/ChatUserCard';
import SearchChatUser from '../../components/SearchChatUser';
import {SEARCH_USER_FAILURE} from '../../redux/auth/auth.actionType';

const Message = () => {
  const dispatch = useDispatch();
  const handleSelectImage = () => {
    console.log('select image');
  };
  useEffect(() => {
    dispatch({type: SEARCH_USER_FAILURE});
  }, []);

  return (
    <div className='bg-black w-full'>
      <Grid
        container
        className='h-screen overflow-y-hidden text-white'
        spacing={0}
      >
        <Grid className='px-5' item xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <Link to={'/'} className='flex space-x-4 items-center py-5'>
                <West />
                <h1 className='text-xl font-bold'>Home</h1>
              </Link>
              <div className='h-[83vh]'>
                <div className=''>
                  <SearchChatUser />
                </div>
                <div className='h-full space-y-4 mt-5 overflow-y-scroll no-scrollbar'>
                  <ChatUserCard />
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full border-l border-slate-800' item xs={9}>
          <div>
            <div className='flex justify-between items-center border-b border-slate-800 p-5'>
              <div className='flex items-center space-x-3'>
                <Avatar src='' />
                <p>Code with Tao</p>
              </div>
              <div className='flex space-x-3'>
                <IconButton color='inherit'>
                  <AddIcCall />
                </IconButton>
                <IconButton color='inherit'>
                  <VideoCall />
                </IconButton>
              </div>
            </div>
            <div className='no-scrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
              <ChatMessage />
            </div>
          </div>
          <div className='sticky bottom-0 border-t border-slate-800'>
            <div className='py-5 flex items-center justify-center space-x-5'>
              <input
                type='text'
                className='bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5'
                placeholder='Type message...'
              />
              <div>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleSelectImage}
                  className='hidden'
                  id='image-input'
                  multiple
                />
                <IconButton
                  // className='flex justify-center items-center'
                  color='info'
                >
                  <label htmlFor='image-input'>
                    <Image />
                  </label>
                </IconButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
