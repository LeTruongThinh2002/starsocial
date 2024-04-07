import {MoreHorizRounded} from '@mui/icons-material';
import {Avatar, Card, CardHeader, IconButton} from '@mui/material';
import {useSelector} from 'react-redux';

const ChatUserCard = ({chat}: any) => {
  const {message, auth}: any = useSelector(store => store);
  let user;
  if (auth.user.id !== chat.users[0].id) {
    user = chat.users[0];
  } else {
    user = chat.users[1];
  }
  return (
    <Card
      sx={{backgroundColor: '#1f2937', borderRadius: '40px', color: 'white'}}
    >
      <CardHeader
        avatar={<Avatar src={user.avatar} />}
        action={
          <IconButton color='inherit'>
            <MoreHorizRounded />
          </IconButton>
        }
        title={user.firstName + ' ' + user.lastName}
        subheader={new Date(chat.timestamp).toLocaleString()}
        subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.5)'}}
      />
    </Card>
  );
};

export default ChatUserCard;
