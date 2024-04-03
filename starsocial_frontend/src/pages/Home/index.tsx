import {Add, Article, Image, Videocam} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../../components/PostCard';
import StoryCircle from '../../components/StoryCircle';
import CreatePostForm from '../../forms/CreatePost';
import {getAllPostAction} from '../../redux/post/post.action';

const story = [1, 2, 3, 4];
// const post = [1, 2, 3, 4];
const Home = () => {
  const {auth}: any = useSelector(store => store);
  const {post}: any = useSelector(store => store);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllPostAction()(dispatch);
  }, [post.newComments, post.post]);
  // console.log(post);
  const user = auth.user;
  return (
    <div className='bg-transparent w-3/4 py-5'>
      <section className='flex items-center p-5 rounded-b-md'>
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

      <Card sx={{backgroundColor: '#1f2937', color: 'white'}} className='p-5'>
        <div className='flex  justify-between gap-5'>
          <Avatar src={user.avatar} />
          <CreatePostForm
            user={user}
            children={
              <input
                title='createPost'
                name='createPost'
                type='text'
                placeholder='The interesting thing today is...'
                readOnly
                className='outline-none w-full h-full rounded-full px-5 bg-transparent border border-[#575e7e]'
              />
            }
          />
        </div>
        <div className='flex justify-center space-x-9'>
          <div className='flex items-center'>
            <CreatePostForm
              user={user}
              children={
                <>
                  <IconButton color='primary'>
                    <Image />
                  </IconButton>
                  <span>media</span>
                </>
              }
            />
          </div>
          <div className='flex items-center'>
            <CreatePostForm
              user={user}
              children={
                <>
                  <IconButton color='primary'>
                    <Videocam />
                  </IconButton>
                  <span>video</span>
                </>
              }
            />
          </div>
          <div className='flex items-center'>
            <CreatePostForm
              user={user}
              children={
                <>
                  <IconButton color='primary'>
                    <Article />
                  </IconButton>
                  <span>Write Article</span>
                </>
              }
            />
          </div>
        </div>
      </Card>
      <div className='mt-5 space-y-5'>
        {post.posts.map((pos: any, index: any) => (
          <PostCard user={auth.user} key={index} post={pos} />
        ))}
      </div>
    </div>
  );
};

export default Home;
