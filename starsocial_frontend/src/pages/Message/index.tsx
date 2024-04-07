import {
  AddIcCall,
  Image,
  VideoCall,
  VideoCameraBackRounded,
  West
} from '@mui/icons-material';
import {Avatar, Grid, IconButton} from '@mui/material';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import ChatMessage from '../../components/ChatMessage';
import ChatUserCard from '../../components/ChatUserCard';
import SearchChatUser from '../../components/SearchChatUser';
import {SEARCH_USER_FAILURE} from '../../redux/auth/auth.actionType';
import {createMessage, getAllChat} from '../../redux/message/message.action';
import {showToast} from '../../ultis/showToast';
import {uploadToCLoudinary} from '../../ultis/uploadToCloudinary';

const Message = () => {
  const dispatch = useDispatch();
  const {message, auth}: any = useSelector(store => store);
  const [currentChat, setCurrentChat] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any>();
  const [image, setImage] = useState(['']);
  const [video, setVideo] = useState(['']);
  const [reviewImg, setReviewImg] = useState(['']);
  const [reviewVideo, setReviewVideo] = useState(['']);

  const handleUploadImage = async (value: any) => {
    if (value.length > 6) {
      showToast('Image limits is 5', 'error');
    } else {
      let urls: string[] = [];
      for (const file of value) {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            urls.push(reader.result as string);
            setReviewImg([...urls]);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
      setImage(value);
    }
  };
  const handleUploadVideo = async (value: any) => {
    let urls: string[] = [];
    for (const file of value) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          urls.push(reader.result as string);
          setReviewVideo(urls);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
    setVideo(value);
  };
  useEffect(() => {
    dispatch({type: SEARCH_USER_FAILURE});
  }, []);
  useEffect(() => {
    getAllChat()(dispatch);
    // dispatch({type: SEARCH_USER_FAILURE});

    // Tìm cuộc trò chuyện hiện tại và thiết lập messages tương ứng
    if (currentChat) {
      const currentChatMessages = message.chats.find(
        (item: any) => item.id === currentChat.id
      )?.messages;

      if (currentChatMessages) {
        setMessages(currentChatMessages);
      }
    }
  }, [message.chats, currentChat, dispatch]);

  const handleCreateMessage = async (value: any) => {
    if (currentChat) {
      let message = {
        chatId: currentChat.id,
        content: value,
        image: [''],
        video: ''
      };
      message.image = await uploadToCLoudinary(image, 'image');
      message.video = (await uploadToCLoudinary(video, 'video'))[0];
      createMessage(message, message.chatId)(dispatch);
    }
  };

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
                  {message.chats.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <ChatUserCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full border-l border-slate-800' item xs={9}>
          {currentChat ? (
            <>
              <div>
                <div className='flex justify-between items-center border-b border-slate-800 p-5'>
                  <div className='flex items-center space-x-3'>
                    {auth.user.id === currentChat.users[0].id ? (
                      <>
                        <Avatar src={currentChat.users[1].avatar} />
                        <p>{`${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`}</p>
                      </>
                    ) : (
                      <>
                        <Avatar src={currentChat.users[0].avatar} />
                        <p>{`${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}</p>
                      </>
                    )}
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
                <div className='no-scrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 lg:py-16 xl:py-10 py-16'>
                  {messages &&
                    messages.length > 0 &&
                    messages.map((msg: any) => (
                      <ChatMessage key={msg.id} messages={msg} />
                    ))}
                </div>
                <div className='sticky bg-black border-slate-800 bottom-0 border-t '>
                  <div className='py-5  flex items-center justify-center space-x-5'>
                    <input
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter' && e.target.value) {
                          handleCreateMessage(e.target.value);
                          (e.target as HTMLTextAreaElement).value = '';
                        }
                      }}
                      type='text'
                      className='bg-black border border-[#3b40544] rounded-full w-[85%] py-3 px-5'
                      placeholder='Type message...'
                    />
                    <div>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e: any) => handleUploadImage(e.target.files)}
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
                    <div>
                      <input
                        type='file'
                        accept='video/*'
                        onChange={(e: any) => handleUploadVideo(e.target.files)}
                        className='hidden'
                        id='video-input'
                      />
                      <IconButton
                        // className='flex justify-center items-center'
                        color='info'
                      >
                        <label htmlFor='video-input'>
                          <VideoCameraBackRounded />
                        </label>
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='h-full w-full flex items-center justify-center'>
              <span className='text-xl font-semibold text-white opacity-50'>
                No chat selected
              </span>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
