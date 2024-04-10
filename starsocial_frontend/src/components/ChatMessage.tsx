import {Delete, PlayCircleRounded} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deletedMessage} from '../redux/message/message.action';
import ViewImageModal from './ViewImageModal';

const ChatMessage = ({messages}: any) => {
  const {auth}: any = useSelector(store => store);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteMessage = () => {
    deletedMessage(messages.id)(dispatch);
  };

  return (
    <div
      className={`flex flex-row ${
        auth.user.id !== messages.user.id ? 'justify-start' : 'justify-end'
      } text-white`}
    >
      {deleteMessage && (
        <IconButton onClick={handleDeleteMessage} size='large' color='error'>
          <Delete color='inherit' />
        </IconButton>
      )}
      <div
        className={`p-1 ${
          (messages.image[0] || messages.video) !== null
            ? 'rounded-md'
            : 'px-5 rounded-full'
        } bg-[#191c29]`}
      >
        <div>
          <div className='grid grid-cols-1 gap-3'>
            {messages.image[0] !== null &&
              messages.image.map((item: string) => (
                <ViewImageModal
                  key={item}
                  children={
                    <img
                      className='object-cover object-center'
                      alt=''
                      width={300}
                      src={item}
                    />
                  }
                  image={item}
                  video={null}
                />
              ))}
            {messages.video !== null && (
              <ViewImageModal
                children={
                  <div className='relative'>
                    <div className='flex justify-center items-center w-full h-full bg-white'>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1,
                          border: '1px solid black',
                          borderRadius: '50px'
                        }}
                        color='inherit'
                        //onClick={handleClose}
                        aria-label='play'
                        size='large'
                      >
                        <PlayCircleRounded fontSize='inherit' />
                      </IconButton>
                    </div>
                    <video
                      className='object-cover object-center'
                      width={300}
                      src={messages.video}
                    />
                  </div>
                }
                image={null}
                video={messages.video}
              />
            )}
          </div>
          <p
            onClick={() => setDeleteMessage(!deleteMessage)}
            className={`${
              messages.image[0] !== null ? 'py-2' : 'py-1'
            } cursor-pointer`}
          >
            {messages.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
