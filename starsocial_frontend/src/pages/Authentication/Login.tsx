import {Button, TextField} from '@mui/material';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {LoginType, loginUserAction} from '../../redux/auth/auth.action';

const initialValues = {email: '', password: ''};
const validationSchema = {
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
};
const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (value: LoginType) => {
    console.log('hanlde submit', value);
    dispatch(loginUserAction(value));
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
          <Button
            sx={{padding: '.8rem 0rem'}}
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
