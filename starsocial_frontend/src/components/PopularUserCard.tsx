import {Avatar, CardHeader} from '@mui/material';
import {red} from '@mui/material/colors';

const PopularUserCard = () => {
  return (
    <div className='flex flex-row gap-5 items-center rounded-md'>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label='recipe'>
            R
          </Avatar>
        }
        title='Shrimp and Chorizo Paella'
        subheader='Suggestions'
        sx={{
          cursor: 'pointer',
          color: 'white',
          '.MuiCardHeader-subheader': {color: 'white', opacity: 0.7}
        }}
      />
      <a href='/' className='text-sm text-sky-600'>
        Follow
      </a>
    </div>
  );
};

export default PopularUserCard;
