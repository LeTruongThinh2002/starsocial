import {Check, Close} from '@mui/icons-material';
import {Divider, IconButton, Modal} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deletePostAction} from '../redux/post/post.action';

const DeletePostModal = ({postId, children, handleCloseModal}: any) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleDeletePost = () => {
    deletePostAction(postId)(dispatch);
    handleCloseModal();
  };

  return (
    <>
      <button className='w-full' type='button' onClick={handleOpen}>
        {children}
      </button>

      <Modal
        open={open}
        onClose={() => {
          handleCloseModal();
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='modal w-fit h-fit'>
          <h2 className='p-4 text-xl font-bold'>Accept delete post!</h2>
          <Divider className='bg-white opacity-50' />
          <p className='p-4 text-lg lg:w-[40rem] w-[20rem]'>
            Post will be permanently erased and unable to recover. Are you sure
            you want to agree?
          </p>
          <div className='w-full flex justify-end gap-3'>
            <IconButton
              onClick={() => {
                handleCloseModal();
              }}
              size='large'
              color='error'
            >
              <Close fontSize='inherit' />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeletePost();
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

export default DeletePostModal;
