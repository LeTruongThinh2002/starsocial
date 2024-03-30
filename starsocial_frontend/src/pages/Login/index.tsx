import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import {LoginType, loginUserAction} from '../../redux/auth/auth.action';
const initialValues = {email: '', password: ''};
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (value: LoginType) => {
    console.log('hanlde submit', value);
    loginUserAction(value)(dispatch);
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                component={'span'}
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
          <div>
            <span className=' lg:text-lg text-xl'>
              If you don't have account,{' '}
              <Link className='text-sky-700 underline' to={'/register'}>
                register here!
              </Link>
            </span>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
