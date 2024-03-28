import {
  Bookmark,
  Comment,
  Favorite,
  MoreVert,
  Share
} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import {red} from '@mui/material/colors';

const PostCard = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label='recipe'>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title='User Name'
        subheader='Date Post'
      />
      <div className='w-full flex justify-center bg-current'>
        <CardMedia
          component='img'
          sx={{
            width: 'calc(-2px + min(470px, 100vw))',
            boxSizing: 'border-box'
          }}
          image='https://cdn.pixabay.com/photo/2023/11/08/23/57/flower-8376030_1280.jpg'
          alt='Paella dish'
        />
      </div>
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <Favorite />
        </IconButton>
        <IconButton aria-label='comment'>
          <Comment />
        </IconButton>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
        <IconButton sx={{marginLeft: 'auto'}} aria-label='bookmark'>
          <Bookmark />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
