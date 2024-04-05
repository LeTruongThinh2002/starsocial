import {MoreHorizRounded} from '@mui/icons-material';
import {Avatar, Card, CardHeader, IconButton} from '@mui/material';

const ChatUserCard = () => {
  return (
    <Card
      sx={{backgroundColor: '#1f2937', borderRadius: '40px', color: 'white'}}
    >
      <CardHeader
        avatar={<Avatar />}
        action={
          <IconButton color='inherit'>
            <MoreHorizRounded />
          </IconButton>
        }
        title='Code with Tao'
        subheader='new message'
        subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.5)'}}
      />
    </Card>
  );
};

export default ChatUserCard;
