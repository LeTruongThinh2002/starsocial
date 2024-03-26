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
import * as Yup from 'yup';
import {RegisterType, registerUserAction} from '../../redux/auth/auth.action';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: ''
};
const validationSchema = {
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
};
const Register = () => {
  const [gender, setGender] = useState('male');
  const dispatch = useDispatch();

  const handleSubmit = (value: RegisterType) => {
    value.gender = gender;
    console.log('hanlde submit', value);
    dispatch(registerUserAction({data: value}));
  };
  const handleChangeGenfer = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
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
                focused={false}
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
                focused={false}
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
                focused={false}
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
                focused={false}
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
        </Form>
      </Formik>
    </>
  );
};

export default Register;
