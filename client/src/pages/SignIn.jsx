import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import image from '../assets/intro.jpg';

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        className={`flex max-w-7xl w-full mx-auto flex-col md:flex-row gap-8 p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Left - Image */}
        <div className='flex-1 md:flex-[3]'>
          <img 
            src={image} 
            alt="Intro" 
            className="w-full h-auto object-cover rounded-3xl" 
          />
        </div>

        {/* Right - Form */}
        <div
          className={`flex-1 md:flex-[2] flex flex-col justify-center p-8 shadow-lg rounded-2xl ${
            theme === 'dark' ? 'bg-gray-700 text-antique-white' : 'bg-white text-gray-900'
          }`}
        >
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                className={`${theme === 'dark' ? 'bg-gray-600 text-antique-white' : 'bg-gray-100 text-gray-900'}`}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
                className={`${theme === 'dark' ? 'bg-gray-600 text-antique-white' : 'bg-gray-100 text-gray-900'}`}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-4' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
