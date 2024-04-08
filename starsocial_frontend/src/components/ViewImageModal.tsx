import {CancelRounded} from '@mui/icons-material';
import {IconButton, Modal} from '@mui/material';
import {useState} from 'react';

const ViewImageModal = ({image, video, children}: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className='w-full' type='button' onClick={handleOpen}>
        {children}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='flex justify-center items-center'
      >
        <div className='bg-transparent p-4 rounded-lg overflow-auto relative'>
          <div className='flex justify-end'>
            <IconButton
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: '100'
              }}
              color='error'
              onClick={handleClose}
              aria-label='close'
              size='large'
            >
              <CancelRounded fontSize='inherit' />
            </IconButton>
          </div>
          {image && (
            <img
              src={image}
              className='object-center max-w-screen max-h-screen'
              width='100%'
              alt=''
            />
          )}
          {video && (
            <video
              src={video}
              controls
              loop
              className='object-center max-w-screen max-h-screen'
              width='100%'
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ViewImageModal;
