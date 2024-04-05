import SpeakerNotesOffRoundedIcon from '@mui/icons-material/SpeakerNotesOffRounded';
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import {
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Input
} from '@mui/material';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchUserAction} from '../redux/auth/auth.action';
import {SEARCH_USER_FAILURE} from '../redux/auth/auth.actionType';

const SearchChatUser = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const {message, auth}: any = useSelector(store => store);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({type: SEARCH_USER_FAILURE});
    console.log('click');
  };

  const handleSearchUser = (e: any) => {
    setUsername(e.target.value);
    setLoading(true);

    if (e.target.value.trim().length > 0) {
      searchUserAction(e.target.value)(dispatch);
    } else {
      dispatch({type: SEARCH_USER_FAILURE});
    }
    setLoading(false);
    // console.log(auth.searchUser);
  };

  return (
    <div>
      <div className='py-5 relative'>
        <div className='flex px-5 py-3 items-center rounded-full bg-[#101010]'>
          <Input
            className='bg-transparent w-full'
            placeholder='Search user...'
            onChange={e => {
              handleSearchUser(e);
            }}
            sx={{color: 'white'}}
            color='primary'
            disableUnderline
            type='text'
            value={username}
          />
          {loading && <CircularProgress sx={{color: 'white'}} size={24} />}
        </div>
        {auth.searchUser.length > 0 &&
          auth.searchUser.map((item: any, index: any) => (
            <Card
              key={item.id}
              sx={{
                backgroundColor: '#1f2937',
                borderRadius: '40px',
                color: 'white'
              }}
              className='absolute w-full z-10 cursor-pointer'
              style={{top: `${5 + index * 5}rem`}}
              onClick={() => {
                handleClick();
                setUsername('');
              }}
            >
              <CardHeader
                avatar={<Avatar src={item.avatar} />}
                title={item.firstName + ' ' + item.lastName}
                subheader={
                  item.followers.some((check: any) => check === auth.user.id) &&
                  item.followings.some(
                    (check: any) => check === auth.user.id
                  ) ? (
                    <span className='text-green-600'>Access chat!</span>
                  ) : (
                    <span className='text-red-500'>Denied chat!</span>
                  )
                }
                action={
                  item.followers.some((check: any) => check === auth.user.id) &&
                  item.followings.some(
                    (check: any) => check === auth.user.id
                  ) ? (
                    <IconButton color='success'>
                      <SpeakerNotesRoundedIcon />
                    </IconButton>
                  ) : (
                    <IconButton color='error'>
                      <SpeakerNotesOffRoundedIcon />
                    </IconButton>
                  )
                }
                className='bg-transparent'
                subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.5)'}}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchChatUser;
