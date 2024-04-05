import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import {Button as Buttonjoy} from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {updateProfileAction} from '../redux/auth/auth.action';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required')
});

const sx = {
  // Chỉnh màu label
  '& .MuiInputLabel-root': {
    color: '#9ea4c0'
  },
  '& .MuiInputBase-input': {
    color: 'rgb(255, 255, 255)'
  }
};

const ProfileModal = ({user}: any) => {
  let initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    avatar: user.avatar
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gender, setGender] = useState(user.gender);
  const dispatch = useDispatch();
  const handleSubmit = (values: any) => {
    values.gender = gender;
    if (gender == 'male') {
      values.avatar =
        'https://cdn.pixabay.com/animation/2022/12/05/15/23/15-23-06-837_512.gif';
    } else {
      values.avatar =
        'https://cdn.pixabay.com/animation/2023/12/01/11/58/11-58-39-702_512.gif';
    }
    updateProfileAction(values)(dispatch);
    handleClose();
  };
  const handleChangeGenfer = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>
        Edit Profile
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='modal p-4 lg:w-fit md:w-fit w-full'>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            <Form>
              <div className='lg:h-[20rem] md:h-[20rem] h-[15rem]'>
                <img
                  src={user.background}
                  className='w-full h-full rounded-t-md object-cover object-center'
                  alt=''
                />
              </div>
              <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
                <Avatar
                  className='transform -translate-y-24'
                  sx={{width: '10rem', height: '10rem'}}
                  src={user.avatar}
                />
              </div>
              <div className='flex flex-col gap-5'>
                <div>
                  <Field
                    as={TextField}
                    name='firstName'
                    label='First name'
                    type='text'
                    variant='standard'
                    fullWidth
                    sx={sx}
                  />
                  <ErrorMessage
                    name='firstName'
                    component={'div'}
                    className='text-red-500'
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name='lastName'
                    label='Last name'
                    type='text'
                    variant='standard'
                    fullWidth
                    sx={sx}
                  />
                  <ErrorMessage
                    name='lastName'
                    component={'div'}
                    className='text-red-500'
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name='email'
                    label='Email'
                    type='email'
                    variant='standard'
                    fullWidth
                    sx={sx}
                  />
                  <ErrorMessage
                    name='email'
                    component={'div'}
                    className='text-red-500'
                  />
                </div>
              </div>

              <div>
                <RadioGroup
                  onChange={event => handleChangeGenfer(event)}
                  row
                  name='gender'
                  defaultValue={gender}
                >
                  <FormControlLabel
                    value='female'
                    control={<Radio />}
                    label='Female'
                  />
                  <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label='Male'
                  />
                </RadioGroup>
              </div>
              <div className='flex flex-row gap-3 p-2 justify-end'>
                <Buttonjoy
                  variant='outlined'
                  type='submit'
                  color='primary'
                  size='lg'
                  //onClick={handleClose}
                >
                  <CloudDoneRoundedIcon />
                </Buttonjoy>
                <Buttonjoy
                  variant='outlined'
                  onClick={handleClose}
                  color='danger'
                  size='lg'
                >
                  <CloseRoundedIcon />
                </Buttonjoy>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
};
export default ProfileModal;
