import {Bookmark, Comment, Favorite, MoreVert, Share} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import red from '@mui/material/colors/red';

const PostCard = () => {
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
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label='recipe'>
            R
          </Avatar>
        }
        action={
          <IconButton color='inherit' aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title='User Name'
        subheader='Date Post'
        subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.5)'}}
      />
      <div className='w-full flex justify-center border border-stone-800 rounded-lg'>
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
        <Typography variant='body2' color='inherits'>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color='inherit' aria-label='add to favorites'>
          <Favorite />
        </IconButton>
        <IconButton color='inherit' aria-label='comment'>
          <Comment />
        </IconButton>
        <IconButton color='inherit' aria-label='share'>
          <Share />
        </IconButton>
        <IconButton color='inherit' sx={{marginLeft: 'auto'}} aria-label='bookmark'>
          <Bookmark />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
