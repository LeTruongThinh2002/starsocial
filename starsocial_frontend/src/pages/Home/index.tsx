import {Add, Article, Image, Videocam} from '@mui/icons-material';
import {Avatar, Card, IconButton} from '@mui/material';
import PostCard from '../../components/PostCard';
import StoryCircle from '../../components/StoryCircle';

const story = [1, 2, 3, 4];
const post = [1, 2, 3, 4];
const Home = () => {
  const handleOpenCreatePostModal = () => {
    console.log('handleOpenCreatePostModal');
  };
  return (
    <div className='bg-transparent w-3/4 py-5'>
      <section className='flex items-center p-5 rounded-b-md text-white'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar
            sx={{width: '4rem', height: '4rem'}}
            // src='https://i.postimg.cc/HsNS3tY3/image.jpg'
          >
            <Add sx={{fontSize: '3rem'}} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map(index => (
          <StoryCircle key={index} />
        ))}
      </section>

      <Card className='p-5 mt-5'>
        <div className='flex justify-between gap-5'>
          <Avatar />
          <input
            title='name'
            name='name'
            readOnly
            type='text'
            className='outline-none w-[90%] rounded-full px-5 bg-transparent border border-[#3b4054]'
          />
        </div>
        <div className='flex justify-center space-x-9 mt-5'>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <Image />
            </IconButton>
            <span>media</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <Videocam />
            </IconButton>
            <span>video</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <Article />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className='mt-5 space-y-5'>
        {post.map(index => (
          <PostCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
