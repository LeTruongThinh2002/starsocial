import toast from 'react-hot-toast';
export const showToast = (
  message: string,
  type: 'success' | 'error' = 'error'
) => {
  if (type === 'success') {
    toast(message, {
      duration: 5000,
      className: 'bg-slate-800 text-green-400 font-bold',
      icon: (
        <img
          src='/wired-gradient-1865-shooting-stars.gif'
          className='w-[2.5rem] h-[2.5rem] object-cover object-center rounded-full'
          alt=''
        />
      )
    });
  } else {
    toast(message, {
      duration: 5000,
      className: 'bg-slate-800 text-red-500 font-bold',
      icon: (
        <img
          src='/error.gif'
          className='w-[2.5rem] h-[2.5rem] object-cover object-center rounded-full'
          alt=''
        />
      )
    });
  }
};
