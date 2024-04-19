import { DeleteRounded } from "@mui/icons-material";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import ChatDeleteModal from "./ChatDeleteModal";

const ChatUserCard = ({ chat }: any) => {
  const { message, auth }: any = useSelector((store) => store);
  let user;
  if (auth.user.id !== chat.users[0].id) {
    user = chat.users[0];
  } else {
    user = chat.users[1];
  }
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        boxShadow: "0px 0px 4px rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "40px",
        color: "white",
        overflowY: "auto",
        margin: "5px",
      }}
      className="no-scrollbar"
    >
      <CardHeader
        avatar={<Avatar src={user.avatar} />}
        action={
          <IconButton color="error">
            <ChatDeleteModal
              children={<DeleteRounded color="inherit" />}
              chatId={chat.id}
              userName={user.firstName + " " + user.lastName}
            />
          </IconButton>
        }
        className="cursor-pointer"
        title={user.firstName + " " + user.lastName}
        subheader={new Date(chat.timestamp).toLocaleString()}
        subheaderTypographyProps={{ color: "rgba(255, 255, 255, 0.5)" }}
      />
    </Card>
  );
};

export default ChatUserCard;
