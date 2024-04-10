import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import {RegisterType, registerUserAction} from '../../redux/auth/auth.action';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
  avatar: ''
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});
const Register = () => {
  const [gender, setGender] = useState('male');
  const dispatch = useDispatch();

  const handleSubmit = async (value: RegisterType) => {
    value.gender = gender;
    if (gender == 'male') {
      value.avatar =
        'https://cdn.pixabay.com/animation/2022/12/05/15/23/15-23-06-837_512.gif';
    } else {
      value.avatar =
        'https://cdn.pixabay.com/animation/2023/12/01/11/58/11-58-39-702_512.gif';
    }
    console.log('hanlde submit', value);
    await registerUserAction(value)(dispatch);
  };
  const handleChangeGenfer = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className='space-y-5'>
          <div className='space-y-5'>
            <div>
              <Field
                as={TextField}
                name='firstName'
                label='First name'
                type='text'
                variant='standard'
                fullWidth
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
              />
              <ErrorMessage
                name='email'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <div>
              <Field
                as={TextField}
                name='password'
                label='Password'
                type='password'
                variant='standard'
                fullWidth
              />
              <ErrorMessage
                name='password'
                component={'div'}
                className='text-red-500'
              />
            </div>
          </div>

          <div>
            <RadioGroup
              onChange={event => handleChangeGenfer(event)}
              row
              defaultValue='male'
              name='gender'
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </div>

          <Button
            sx={{padding: '.8rem 0rem'}}
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Register
          </Button>
          <div>
            <span className=' lg:text-lg text-xl'>
              If you have account,{' '}
              <Link className='text-sky-700 underline' to={'/login'}>
                login here!
              </Link>
            </span>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
