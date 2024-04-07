import {PlayCircleRounded} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useSelector} from 'react-redux';
import ViewImageModal from './ViewImageModal';

const ChatMessage = ({messages}: any) => {
  const {auth}: any = useSelector(store => store);
  return (
    <div
      className={`flex ${
        auth.user.id !== messages.user.id ? 'justify-start' : 'justify-end'
      } text-white`}
    >
      <div
        className={`p-1 ${
          (messages.image[0] || messages.video) !== null
            ? 'rounded-md'
            : 'px-5 rounded-full'
        } bg-[#191c29]`}
      >
        <div className='grid grid-cols-1 gap-3'>
          {messages.image[0] !== null &&
            messages.image.map((item: string) => (
              <ViewImageModal
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
        <p className={`${messages.image[0] !== null ? 'py-2' : 'py-1'}`}>
          {messages.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
