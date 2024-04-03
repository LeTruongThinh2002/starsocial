import {Comment, MoreVert, Share} from '@mui/icons-material';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {Divider} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCommentAction, likePostAction} from '../redux/post/post.action';
import {getTimeAgo} from '../ultis/getTimeAgo';
import PostMedia from './PostMedia';

const PostCard = ({user, post}: any) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const handleLikePost = () => {
    likePostAction(post.id)(dispatch);
  };
  const handleShowComment = () => {
    setShowComments(!showComments);
  };
  const handleCreateComment = (value: string) => {
    if (value.trim().length > 0) {
      console.log(value);
      createCommentAction(value, post.id)(dispatch);
    }
  };
  return (
    <Card
      sx={{
        backgroundColor: 'transparent',
        color: 'white',
        borderBottom: '1px solid #1f2937',
        borderRadius: '0px'
      }}
    >
      <CardHeader
        avatar={<Avatar src={`${post.user.avatar}`} />}
        action={
          <IconButton color='inherit' aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={
          <Link
            className='font-bold hover:text-sky-600'
            to={`/profile/${post.user.id}`}
          >
            {post.user.firstName + ' ' + post.user.lastName}
          </Link>
        }
        subheader={
          new Date(post.createAt).toLocaleTimeString() +
          ' - ' +
          new Date(post.createAt).toLocaleDateString()
        }
        subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.5)'}}
        titleTypographyProps={{fontSize: '1rem'}}
      />
      <div className=''>
        <PostMedia image={post.image} video={post.video} />
      </div>
      <CardContent>
        <Typography variant='body1' color='inherits'>
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className='flex flex-col w-full'>
        <div className='flex flex-row w-full'>
          <IconButton
            onClick={handleLikePost}
            color='inherit'
            aria-label='add to favorites'
          >
            {post.liked.some((likedUser: any) => likedUser.id === user.id) ? (
              <FavoriteRoundedIcon color='error' />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </IconButton>
          <IconButton
            onClick={handleShowComment}
            color='inherit'
            aria-label='comment'
          >
            <Comment />
          </IconButton>
          <IconButton color='inherit' aria-label='share'>
            <Share />
          </IconButton>
          <IconButton
            color='inherit'
            sx={{marginLeft: 'auto'}}
            aria-label='bookmark'
          >
            {user.savedPost?.some(
              (savedPost: any) => savedPost.id === post.id
            ) ? (
              <BookmarkAddedRoundedIcon color='error' />
            ) : (
              <BookmarkBorderRoundedIcon />
            )}
          </IconButton>
        </div>
        <div className='flex ml-[1.3rem] gap-2 text-sm opacity-50 w-full'>
          <span>{post.liked.length} like</span>
          <span>{post.comments.length} comment</span>
        </div>
      </CardActions>
      {showComments && (
        <section>
          <div className='flex items-center space-x-5 mx-3 my-2'>
            <Avatar src={user.avatar} />
            <input
              type='text'
              className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
              placeholder='write your comment...'
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleCreateComment((e.target as HTMLTextAreaElement).value);
                  (e.target as HTMLTextAreaElement).value = '';
                }
              }}
            />
          </div>
          <Divider />
          <div className='mx-3 space-y-2 my-5 text-md'>
            {post.comments
              .slice(-5)
              .reverse()
              .map((cmt: any) => (
                <div key={cmt.id} className='flex items-center space-x-5'>
                  <Avatar src={cmt.user.avatar} />

                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h4 className='cursor-pointer font-bold hover:text-sky-600'>
                        {cmt.user.firstName + ' ' + cmt.user.lastName}
                      </h4>
                      <p>{cmt.content}</p>
                    </div>
                    <p>{getTimeAgo(cmt.createdAt)}</p>
                  </div>
                  <div className='cursor-pointer' style={{marginLeft: 'auto'}}>
                    <FavoriteBorderRoundedIcon />
                  </div>
                </div>
              ))}
            <div className='flex justify-center'>
              <Link className='hover:text-sky-600' to={`/post/${post.id}`}>
                See more...
              </Link>
            </div>
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
