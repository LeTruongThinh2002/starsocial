import {Avatar, Card, CardHeader, CircularProgress, Input} from '@mui/material';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {searchUserAction} from '../redux/auth/auth.action';
import {SEARCH_USER_FAILURE} from '../redux/auth/auth.actionType';

const SearchUser = () => {
  const [loading, setLoading] = useState(false);
  const {auth}: any = useSelector(store => store);
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log('click');
  };

  const handleSearchUser = (e: any) => {
    setLoading(true);

    if (e.target.value.trim().length > 0) {
      searchUserAction(e.target.value)(dispatch);
    } else {
      dispatch({type: SEARCH_USER_FAILURE});
    }
    setLoading(false);
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
          />
          {loading && <CircularProgress sx={{color: 'white'}} size={24} />}
        </div>
        {auth.searchUser.length > 0 &&
          auth.searchUser.map((item: any, index: any) => (
            <Link to={`/profile/${item.id}`}>
              <Card
                key={item.id}
                sx={{
                  backgroundColor: '#1f2937',
                  borderRadius: '40px',
                  color: 'white'
                }}
                className='absolute flex flex-row items-center w-full z-10 cursor-pointer'
                style={{top: `${5 + index * 5}rem`}}
              >
                <CardHeader
                  onClick={() => {
                    handleClick();
                  }}
                  avatar={<Avatar src={item.avatar} />}
                  title={item.firstName + ' ' + item.lastName}
                  subheader={
                    item.followers.length +
                    ' follow ' +
                    item.followings.length +
                    ' following'
                  }
                  className='bg-transparent'
                  subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.5)'}}
                />
                {item.followers.some((check: any) => check === auth.user.id) &&
                item.followings.some((check: any) => check === auth.user.id) ? (
                  <div
                    style={{marginLeft: 'auto'}}
                    className='text-gray-600 px-3'
                  >
                    Following
                  </div>
                ) : (
                  <div
                    style={{marginLeft: 'auto'}}
                    className='text-sky-600  px-3'
                  >
                    Follow
                  </div>
                )}
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
