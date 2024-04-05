import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';
import ProfileModal from '../../components/ProfileModal';
import ReelCard from '../../components/ReelCard';
import {
  followUserAction,
  getProfileByIdAction
} from '../../redux/auth/auth.action';
import {GET_PROFILE_BY_ID_FAILURE} from '../../redux/auth/auth.actionType';
import {getUserPostAction} from '../../redux/post/post.action';
import {GET_USER_POST_FAILURE} from '../../redux/post/post.actionType';

const tabs = [
  {value: 'posts', name: 'Posts'},
  {value: 'reels', name: 'Reels'},
  {value: 'saved', name: 'Saved'},
  {value: 'stories', name: 'Stories'}
];
export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  background: string;
  followers: [];
  followings: [];
  savedPost: [];
};
export type PostType = {
  id: number;
  caption: string;
  image: [];
  video: [];
  user: UserType;
  liked: [];
  createAt: any;
  comments: [];
};
const reels = [1, 2, 3, 4, 5];
const Profile = () => {
  const {id} = useParams();
  const {auth, post}: any = useSelector(store => store);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserType>();
  const [postUser, setPostUser] = useState<PostType[]>([]);

  const isUnmounted = useRef(false);

  useEffect(() => {
    getProfileByIdAction(id)(dispatch).then(() => {
      setUser(auth.userById);
    });
    getUserPostAction(id)(dispatch).then(() => {
      setPostUser(post.post);
    });

    // Thực hiện cleanup khi component unmount
    return () => {
      isUnmounted.current = true;
    };
  }, [id, auth.userById, dispatch]);

  useEffect(() => {
    if (isUnmounted.current) {
      dispatch({type: GET_PROFILE_BY_ID_FAILURE});
      dispatch({type: GET_USER_POST_FAILURE});
    }
  }, [dispatch]);

  const [value, setValue] = useState('posts');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleFollow = (userId: any) => {
    followUserAction(userId)(dispatch);
  };
  if (user === (null || undefined)) {
    return <Loading />;
  } else {
    return (
      <Card
        className='my-5 w-[70%] border border-slate-800 rounded-md'
        sx={{backgroundColor: 'transparent'}}
      >
        <div className='rounded-md text-white'>
          <div className='h-[15rem]'>
            <img
              src={user?.background}
              className='w-full h-full rounded-t-md object-cover object-center'
              alt=''
            />
          </div>
          <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
            <Avatar
              className='transform -translate-y-24'
              sx={{width: '10rem', height: '10rem'}}
              src={user?.avatar}
            />
            {user && auth.user.id === user?.id ? (
              <ProfileModal user={auth.user} />
            ) : user &&
              auth.user.followings.some((item: any) => item === user.id) ? (
              <Button
                onClick={() => handleFollow(auth.user.id)}
                variant='outlined'
                color='error'
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={() => handleFollow(auth.user.id)}
                variant='outlined'
              >
                Follow
              </Button>
            )}
          </div>
          <div className='p-5'>
            <div>
              <h1 className='py-1 font-bold text-xl'>
                {user?.firstName + ' ' + user?.lastName}
              </h1>
              <p>{user?.gender}</p>
            </div>
            <div className='flex gap-2 items-center py-3'>
              <span>{postUser?.length} post</span>
              <span>{user?.followers.length} followers</span>
              <span>{user?.followings.length} followings</span>
            </div>
          </div>
          <section>
            <Box sx={{width: '100%'}}>
              <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'darkviolet'}}>
                  <TabList onChange={handleChange}>
                    {tabs.map((item, index) => (
                      <Tab
                        key={index}
                        sx={{
                          color: 'gray' // Adjust colors as needed
                        }}
                        label={item.name}
                        value={item.value}
                      />
                    ))}
                  </TabList>
                </Box>
              </TabContext>
            </Box>
            <div className='flex justify-center'>
              {value === 'posts' ? (
                <div className='space-y-5 w-[70%] my-10'>
                  {postUser && user ? (
                    postUser.map((item: PostType) => (
                      <div key={item.id}>
                        <PostCard user={auth.user} post={item} />
                      </div>
                    ))
                  ) : (
                    <Loading />
                  )}
                </div>
              ) : value === 'reels' ? (
                <div className='flex justify-center flex-wrap gap-2 my-10'>
                  {reels.map(index => (
                    <ReelCard key={index} />
                  ))}
                </div>
              ) : value === 'saved' ? (
                <div className='space-y-5 w-[70%] my-10'>
                  {user && user.savedPost ? (
                    user.savedPost.map((item: PostType) => (
                      <div key={item.id}>
                        <PostCard user={auth.user} post={item} />
                      </div>
                    ))
                  ) : (
                    <span className='flex w-full h-full justify-center items-center text-gray-500'>
                      No saved post!
                    </span>
                  )}
                </div>
              ) : (
                <div>Stories</div>
              )}
            </div>
          </section>
        </div>
      </Card>
    );
  }
};

export default Profile;
