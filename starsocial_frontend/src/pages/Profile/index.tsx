import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import PostCard from '../../components/PostCard';
import ProfileModal from '../../components/ProfileModal';
import ReelCard from '../../components/ReelCard';

const tabs = [
  {value: 'posts', name: 'Posts'},
  {value: 'reels', name: 'Reels'},
  {value: 'saved', name: 'Saved'},
  {value: 'reposts', name: 'Reposts'}
];
const posts = [1, 2, 3, 4, 5];
const reels = [1, 2, 3, 4, 5];
const saved = [1, 2, 3, 4, 5];
const Profile = () => {
  const {id} = useParams();
  const {auth}: any = useSelector(store => store);
  // if(id===auth.user.id){
  const user = auth.user;
  // }
  const [value, setValue] = useState('posts');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card
      className='my-5 w-[70%] border border-slate-800 rounded-md'
      sx={{backgroundColor: 'transparent'}}
    >
      <div className='rounded-md text-white'>
        <div className='h-[15rem]'>
          <img
            src={user.background}
            className='w-full h-full rounded-t-md object-cover object-center'
            alt=''
          />
        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar
            className='transform -translate-y-24'
            sx={{width: '10rem', height: '10rem'}}
            src={user.avatar}
          />
          {true ? (
            <ProfileModal user={user} />
          ) : (
            <Button variant='outlined'>Follow</Button>
          )}
        </div>
        <div className='p-5'>
          <div>
            <h1 className='py-1 font-bold text-xl'>
              {user.firstName + ' ' + user.lastName}
            </h1>
            <p>{user.gender}</p>
          </div>
          <div className='flex gap-2 items-center py-3'>
            <span>41 post</span>
            <span>{user.followers.length} followers</span>
            <span>{user.followings.length} followings</span>
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
                {posts.map(index => (
                  <div key={index}>{/* <PostCard /> */}</div>
                ))}
              </div>
            ) : value === 'reels' ? (
              <div className='flex justify-center flex-wrap gap-2 my-10'>
                {reels.map(index => (
                  <ReelCard key={index} />
                ))}
              </div>
            ) : value === 'saved' ? (
              <div className='space-y-5 w-[70%] my-10'>
                {saved.map(index => (
                  <div key={index}>
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
    </Card>
  );
};

export default Profile;
