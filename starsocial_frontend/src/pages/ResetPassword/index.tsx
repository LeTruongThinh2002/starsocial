import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';
import {resetPasswordAction} from '../../redux/auth/auth.action';

export type ResetPwd = {
  token: string;
  password: string;
  confirmPassword: string;
};
const initialValues = {token: '', password: '', confirmPassword: ''};
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (value: ResetPwd) => {
    if (token !== undefined) {
      value.token = token;
    }
    await resetPasswordAction(value)(dispatch);
    navigate('/login');
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
          <div>
            <Field
              as={TextField}
              name='confirmPassword'
              label='Confirm password'
              type='password'
              variant='standard'
              fullWidth
            />
            <ErrorMessage
              name='confirmPassword'
              component={'div'}
              className='text-red-500'
            />
          </div>
          <Button
            sx={{padding: '.8rem 0rem'}}
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Change password
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

export default ResetPassword;
