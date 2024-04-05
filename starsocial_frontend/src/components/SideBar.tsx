import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {ThemeProvider, createTheme, styled} from '@mui/material/styles';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {SideMenu} from './SideMenu'; // Assuming SideMenu provides menu items

const CTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 15
  }
});
const theme = createTheme({
  palette: {
    background: {
      paper: '#333333'
    }
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white',
          fontSize: 18
        }
      }
    }
  }
});

const SideBar = () => {
  const {auth}: any = useSelector(store => store);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: any) => {
    setAnchorEl(null);
    if (value === 'logout') {
      localStorage.removeItem('jwt');
      window.location.reload();
    }
  };

  return (
    <div className='bg-black border-r border-slate-900 h-screen w-fit flex flex-col space-y-4 px-4'>
      <div className='flex items-center justify-center py-8'>
        <Link to='/' className=' text-white hover:bg-gray-700 rounded-full'>
          <CTooltip title={'Starsocial'} placement='right' arrow>
            <IconButton aria-label='Home' color='inherit'>
              <img
                src='/page/moon-and-stars-svgrepo-com.svg'
                width={40}
                alt='home icon'
                title='home icon'
              />
            </IconButton>
          </CTooltip>
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
                <CTooltip title={item.title} placement='right' arrow>
                  <IconButton color='inherit'>{item.icon}</IconButton>
                </CTooltip>
              </Link>
            </li>
          ))}

          <li className='flex items-center justify-center cursor-pointer '>
            <Link
              to={`/profile/${auth.user.id}`}
              className='text-white hover:bg-gray-700 rounded-full'
            >
              <CTooltip
                title={`Profile - ${auth.user.firstName} ${auth.user.lastName}`}
                placement='right'
                arrow
              >
                <IconButton color='inherit'>
                  <Avatar src={`${auth.user.avatar}`} />
                </IconButton>
              </CTooltip>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center justify-center py-4 text-white'>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color='inherit'
          disableTouchRipple
        >
          <CTooltip title={'Menu'} placement='right' arrow>
            <IconButton color='inherit'>
              <MenuRoundedIcon fontSize='large' />
            </IconButton>
          </CTooltip>
        </Button>
        <ThemeProvider theme={theme}>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
          </Menu>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SideBar;
