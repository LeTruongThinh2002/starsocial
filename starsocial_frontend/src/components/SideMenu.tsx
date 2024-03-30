import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';

export const SideMenu = [
  {
    title: 'Home',
    icon: <HomeRoundedIcon fontSize='large' />,
    path: '/'
  },
  {
    title: 'Reels',
    icon: <MovieFilterRoundedIcon fontSize='large' />,
    path: '/reels'
  },
  {
    title: 'Create Reels',
    icon: <DataSaverOnRoundedIcon fontSize='large' />,
    path: '/'
  },
  {
    title: 'Notifications',
    icon: <NotificationsActiveRoundedIcon fontSize='large' />,
    path: '/'
  },
  {
    title: 'Message',
    icon: <ReviewsRoundedIcon fontSize='large' />,
    path: '/message'
  },
  {
    title: 'Communities',
    icon: <Diversity2RoundedIcon fontSize='large' />,
    path: '/'
  }
];
