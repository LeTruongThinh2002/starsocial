import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import {SideMenu} from './SideMenu'; // Assuming SideMenu provides menu items

const SideBar = () => {
  return (
    <div className='bg-black border-r border-slate-900 h-screen w-fit flex flex-col space-y-4 px-4'>
      <div className='flex items-center justify-center py-8'>
        <Link to='/' className=' text-white hover:bg-gray-700 rounded-full'>
          <IconButton aria-label='Home' color='inherit'>
            <img
              src='/page/moon-and-stars-svgrepo-com.svg'
              width={40}
              alt='home icon'
              title='home icon'
            />
          </IconButton>
        </Link>
      </div>
      <div className='flex-grow overflow-hidden'>
        <ul className='flex flex-col gap-6'>
          {SideMenu.map((item, index) => (
            <li
              key={index}
              className='flex items-center justify-center cursor-pointer '
            >
              <Link
                to={item.path}
                className='text-white hover:bg-gray-700 rounded-full'
              >
                <IconButton color='inherit'>{item.icon}</IconButton>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center justify-center py-4'>
        <Link to={'/'} className='hover:bg-gray-700 rounded-full text-white'>
          <IconButton aria-label='Menu' color='inherit'>
            <MenuRoundedIcon fontSize='large' />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
