import {Backdrop, CircularProgress} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {forgotPasswordAction} from '../../redux/auth/auth.action';
import {showToast} from '../../ultis/showToast';

const initialValues = {email: ''};
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    try {
      await forgotPasswordAction(value)(dispatch);
      setLoading(false);
      navigate('/login');
    } catch (error: any) {
      showToast(error, 'error');
      setLoading(false);
    }
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
          </div>
          <Button
            sx={{padding: '.8rem 0rem'}}
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Reset password
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
      <Backdrop
        sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default ForgotPassword;
