import {Check, Close} from '@mui/icons-material';
import {Divider, IconButton, Modal} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteChat} from '../redux/message/message.action';

const ChatDeleteModal = ({chatId, userName, children}: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteChat = async () => {
    await deleteChat(chatId)(dispatch);
    handleClose();
  };
  return (
    <>
      <button className='w-full' type='button' onClick={handleOpen}>
        {children}
      </button>

      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='modal w-fit h-fit'>
          <h2 className='p-4 text-xl font-bold'>Accept delete chat!</h2>
          <Divider className='bg-white opacity-50' />
          <p className='p-4 text-lg lg:w-[40rem] w-[20rem]'>
            Do you want to delete the chat with{' '}
            <span className='text-red-600 font-bold'>{userName}</span>? This
            action will delete all messages with{' '}
            <span className='text-red-600 font-bold'>{userName}</span> in the
            chat!
          </p>
          <div className='w-full flex justify-end gap-3'>
            <IconButton onClick={handleClose} size='large' color='error'>
              <Close fontSize='inherit' />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteChat();
              }}
              size='large'
              color='info'
            >
              <Check fontSize='inherit' />
            </IconButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatDeleteModal;
