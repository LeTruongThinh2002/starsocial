import {MoreVert, Share} from '@mui/icons-material';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Modal
} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  createCommentAction,
  likeCommentAction,
  likePostAction
} from '../redux/post/post.action';
import {getTimeAgo} from '../ultis/getTimeAgo';
import PostMedia from './PostMedia';

const PostModal = ({user, post, children}: any) => {
  const dispatch = useDispatch();
  const handleLikePost = () => {
    likePostAction(post.id)(dispatch);
  };
  const handleCreateComment = (value: string) => {
    if (value.trim().length > 0) {
      console.log(value);
      createCommentAction(value, post.id)(dispatch);
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleLikeComment = (commentId: any) => {
    likeCommentAction(commentId)(dispatch);
  };

  return (
    <>
      <button className='w-full' type='button' onClick={handleOpen}>
        {children}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='modal h-[90vh] w-3/4'>
          <Grid container spacing={0}>
            <Grid className='h-[90vh]' item xs={6}>
              <PostMedia image={post.image} video={post.video} />
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  backgroundColor: 'transparent',
                  color: 'white'
                }}
                className='h-full'
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
                <section>
                  <Divider className='bg-slate-600' />
                  <div className='mx-3 space-y-5 my-5 text-md overflow-y-auto no-scrollbar h-[32.5rem]'>
                    {post.comments
                      .slice()
                      .reverse()
                      .map((cmt: any) => (
                        <div
                          key={cmt.id}
                          className='flex items-center space-x-5'
                        >
                          <Avatar src={cmt.user.avatar} />

                          <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                              <h4 className='cursor-pointer font-bold hover:text-sky-600'>
                                {cmt.user.firstName + ' ' + cmt.user.lastName}
                              </h4>
                              <p>{cmt.content}</p>
                            </div>
                            <p>
                              {getTimeAgo(cmt.createdAt)}
                              {cmt.liked.length > 0 &&
                                ' ● ' + cmt.liked.length + ' like'}
                            </p>
                          </div>
                          <div
                            className='cursor-pointer'
                            style={{marginLeft: 'auto'}}
                            onClick={() => handleLikeComment(cmt.id)}
                          >
                            {cmt.liked.some(
                              (item: any) => item.id === user.id
                            ) ? (
                              <FavoriteRoundedIcon color='error' />
                            ) : (
                              <FavoriteBorderRoundedIcon />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                  <Divider className='bg-slate-600' />
                  <CardActions disableSpacing className='flex flex-col w-full'>
                    <div className='flex flex-row w-full'>
                      <IconButton
                        onClick={handleLikePost}
                        color='inherit'
                        aria-label='add to favorites'
                      >
                        {post.liked.some(
                          (likedUser: any) => likedUser.id === user.id
                        ) ? (
                          <FavoriteRoundedIcon color='error' />
                        ) : (
                          <FavoriteBorderRoundedIcon />
                        )}
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
                  <div className='flex items-center space-x-5 mx-3'>
                    <Avatar src={`${user.avatar}`} />
                    <input
                      type='text'
                      className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
                      placeholder='write your comment...'
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleCreateComment(
                            (e.target as HTMLTextAreaElement).value
                          );
                          (e.target as HTMLTextAreaElement).value = '';
                        }
                      }}
                    />
                  </div>
                </section>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default PostModal;
