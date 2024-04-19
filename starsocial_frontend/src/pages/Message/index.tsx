import {
  Image,
  Menu,
  MmsRounded,
  VideoCameraBackRounded,
  West,
} from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client";
import ChatMessage from "../../components/ChatMessage";
import ChatUserCard from "../../components/ChatUserCard";
import SearchChatUser from "../../components/SearchChatUser";
import { SEARCH_USER_FAILURE } from "../../redux/auth/auth.actionType";
import {
  createMessage,
  editChatImage,
  getAllChat,
} from "../../redux/message/message.action";
import { showToast } from "../../ultis/showToast";
import { uploadToCLoudinary } from "../../ultis/uploadToCloudinary";

const Message = () => {
  const dispatch = useDispatch();
  const { message, auth }: any = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any>();
  const [image, setImage] = useState([""]);
  const [video, setVideo] = useState([""]);
  const [reviewImg, setReviewImg] = useState([""]);
  const [reviewVideo, setReviewVideo] = useState([""]);
  const [stompClient, setStompClient] = useState<any>();
  const chatContainerRef = useRef<any>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [openMenu, setOpenMenu] = useState(true);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    getAllChat()(dispatch);
    console.log("getallchat");
  }, [message.message, message.chat_image]);

  useEffect(() => {
    // Tìm cuộc trò chuyện hiện tại và thiết lập messages tương ứng
    if (currentChat) {
      const currentChatMessages = message.chats.find(
        (item: any) => item.id === currentChat.id,
      )?.messages;

      if (currentChatMessages) {
        setMessages(currentChatMessages);
        console.log(currentChat);
      } else {
        setCurrentChat(null);
        setMessages(null);
      }
    }
  }, [message.chats]);

  //connect Stomp
  useEffect(() => {
    const sock = new SockJS("http://localhost:8888/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onErr);
  }, []);

  //connect current chat messege
  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceived,
      );
    }
  }, [currentChat]);

  const onConnect = () => {
    console.log("onConnect");
  };
  const onErr = () => {
    console.log("onError");
  };

  //send new message to server
  const sendMessageToServer = (newMessage: any) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat.id.toString()}`,
        {},
        JSON.stringify(newMessage),
      );
    }
  };

  //received new message from server
  const onMessageReceived = (payload: any) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("message received from websocket", receivedMessage);
    setMessages([...messages, receivedMessage]);
  };

  //set scroll
  useEffect(() => {
    if (shouldScrollToBottom && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, shouldScrollToBottom]);

  //check user scroll position
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
    // Kiểm tra xem người dùng đã cuộn lên chưa
    const isScrolledUp = scrollTop + clientHeight < scrollHeight - 10; // 10 là ngưỡng nhỏ để xác định người dùng đã cuộn lên

    // Cập nhật state shouldScrollToBottom dựa trên việc người dùng cuộn lên hay không
    setShouldScrollToBottom(!isScrolledUp);
  };

  //upload image/video to filereader review
  const handleUploadImage = async (value: any) => {
    setLoading(true);
    if (value.length > 6) {
      showToast("Image limits is 5", "error");
    } else {
      let urls: string[] = [];
      for (const file of value) {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            urls.push(reader.result as string);
            setReviewImg([...urls]);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }
      setImage(value);
    }
    setLoading(false);
  };
  const handleUploadVideo = async (value: any) => {
    setLoading(true);

    let urls: string[] = [];
    for (const file of value) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          urls.push(reader.result as string);
          setReviewVideo(urls);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
    setVideo(value);
    setLoading(false);
  };

  //delete search user on first render component
  useEffect(() => {
    dispatch({ type: SEARCH_USER_FAILURE });
  }, []);

  //create message
  const handleCreateMessage = async (value: any) => {
    if (currentChat) {
      setLoading(true);
      let message = {
        chatId: currentChat.id,
        content: value,
        image: [""],
        video: "",
      };

      message.image = await uploadToCLoudinary(image, "image");

      message.video = (await uploadToCLoudinary(video, "video"))[0];

      await createMessage({ message, sendMessageToServer })(dispatch);
      setLoading(false);
      setImage([""]);
      setVideo([""]);
    }
  };

  const handleEditChatImage = async (image: any) => {
    setLoading(true);
    const chat_image = (await uploadToCLoudinary(image, "image"))[0];
    const reqChat = {
      chatId: currentChat.id,
      chat_image,
    };
    await editChatImage(reqChat)(dispatch);
    setLoading(false);
  };

  return (
    <div className="bg-black w-full">
      <Grid
        container
        className="h-screen overflow-y-hidden text-white"
        spacing={0}
      >
        {/* Menu Sidebar */}
        <Modal open={openMenu}>
          <div className="px-5 h-full lg:w-1/3 md:w-2/4 w-full bg-[url('background-h.gif')] bg-cover bg-center text-white">
            <div className="flex h-full justify-between space-x-2">
              <div className="w-full">
                <div className="flex space-x-4 items-center py-5">
                  <Link to={"/"} className="flex items-center gap-2">
                    <West />
                    <h1 className="text-xl font-bold">Home</h1>
                  </Link>
                  <span style={{ marginLeft: "auto" }}>
                    <IconButton onClick={handleMenu} color="primary">
                      <Menu color="inherit" />
                    </IconButton>
                  </span>
                </div>

                <div className="h-[83vh]">
                  <div className="">
                    <SearchChatUser />
                  </div>
                  <div className="h-full space-y-4 mt-5 overflow-y-scroll no-scrollbar">
                    {message.chats.map(
                      (item: any) =>
                        item && (
                          <div
                            key={item.id}
                            onClick={() => {
                              setCurrentChat(item);
                              setMessages(item.messages);
                              handleMenu();
                            }}
                          >
                            <ChatUserCard chat={item} />
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Chat Container */}
        <Grid className="h-full border-l border-slate-800" item xs={12}>
          {currentChat ? (
            <>
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 p-5">
                  <div className="flex items-center gap-5">
                    <IconButton
                      className="w-fit"
                      onClick={handleMenu}
                      color="primary"
                    >
                      <Menu color="inherit" />
                    </IconButton>
                    <Link
                      to={`/profile/${
                        auth.user.id === currentChat.users[0].id
                          ? currentChat.users[1].id
                          : currentChat.users[0].id
                      }`}
                      className="flex items-center space-x-3"
                    >
                      {auth.user.id === currentChat.users[0].id ? (
                        <>
                          <Avatar src={currentChat.users[1].avatar} />
                          <p>{`${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`}</p>
                        </>
                      ) : (
                        <>
                          <Avatar src={currentChat.users[0].avatar} />
                          <p>{`${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}</p>
                        </>
                      )}
                    </Link>
                  </div>

                  <div className="flex space-x-3">
                    <input
                      id="chat_image"
                      name="chat_image"
                      type="file"
                      accept="image/*"
                      onChange={(e: any) => handleEditChatImage(e.target.files)}
                      className="hidden"
                    />
                    <IconButton color="inherit">
                      <label className="cursor-pointer" htmlFor="chat_image">
                        <MmsRounded />
                      </label>
                    </IconButton>
                  </div>
                </div>
                <div
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className={`no-scrollbar ${
                    currentChat.chat_image !== ""
                      ? `bg-[url('${currentChat.chat_image}')] bg-cover bg-center`
                      : `bg-black`
                  } overflow-y-scroll h-[82vh] px-2 space-y-5 lg:py-16 xl:py-10 py-16`}
                >
                  {messages &&
                    messages.length > 0 &&
                    messages.map((msg: any) => (
                      <ChatMessage key={msg.id} messages={msg} />
                    ))}
                </div>
                <div className="sticky flex flex-col bg-black border-slate-800 bottom-0 border-t ">
                  <div className="py-5  flex items-center justify-center space-x-5">
                    <input
                      onKeyPress={(e: any) => {
                        if (e.key === "Enter" && e.target.value) {
                          handleCreateMessage(e.target.value);
                          (e.target as HTMLTextAreaElement).value = "";
                        }
                      }}
                      type="text"
                      className="bg-black border border-[#3b40544] rounded-full w-[85%] py-3 px-5"
                      placeholder="Type message..."
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => handleUploadImage(e.target.files)}
                        className="hidden"
                        id="image-input"
                        multiple
                      />
                      <IconButton
                        // className='flex justify-center items-center'
                        color="info"
                      >
                        <label htmlFor="image-input">
                          <Image />
                        </label>
                      </IconButton>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e: any) => handleUploadVideo(e.target.files)}
                        className="hidden"
                        id="video-input"
                      />
                      <IconButton
                        // className='flex justify-center items-center'
                        color="info"
                      >
                        <label htmlFor="video-input">
                          <VideoCameraBackRounded />
                        </label>
                      </IconButton>
                    </div>
                  </div>
                  {(reviewImg.length || reviewVideo.length) > 0 && (
                    <div className="flex items-center pb-3  flex-wrap max-h-[30vh] max-w-screen-md overflow-auto justify-start">
                      {reviewImg.length > 0 &&
                        reviewImg.map((item: any, index: number) => (
                          <img
                            key={index}
                            src={item}
                            className="max-w-[20vh] object-center"
                            alt=""
                          />
                        ))}
                      {reviewVideo[0] !== "" && (
                        <video
                          src={reviewVideo[0]}
                          className="max-w-[20vh] object-center"
                          controls
                          loop
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full w-full relative flex items-center justify-center">
              <span className="text-xl font-semibold text-white opacity-50">
                No chat selected
              </span>
              <IconButton
                onClick={handleMenu}
                color="primary"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <Menu color="inherit" />
              </IconButton>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
