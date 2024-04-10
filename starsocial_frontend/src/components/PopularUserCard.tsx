import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {followUserAction} from '../redux/auth/auth.action';

const PopularUserCard = ({user}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth}: any = useSelector(store => store);

  const handleProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  const handleFollow = () => {
    followUserAction(user.id)(dispatch);
  };

  return (
    <div className='flex flex-row gap-3 border-b border-gray-800 items-center'>
      <CardHeader
        avatar={<Avatar aria-label='recipe' src={user.avatar} />}
        title={user.firstName + ' ' + user.lastName}
        subheader={user.followers.length + ' follow'}
        sx={{
          cursor: 'pointer',
          color: 'white',
          '.MuiCardHeader-subheader': {color: 'white', opacity: 0.7}
        }}
        onClick={handleProfile}
      />
      <div
        onClick={handleFollow}
        style={{marginLeft: 'auto'}}
        className={`text-sm ${
          user.followers.some((item: any) => item === auth.user.id)
            ? 'text-red-600'
            : 'text-sky-600'
        } cursor-pointer`}
      >
        {user.followers.some((item: any) => item === auth.user.id)
          ? 'Unfollow'
          : 'Follow'}
      </div>
    </div>
  );
};

export default PopularUserCard;
