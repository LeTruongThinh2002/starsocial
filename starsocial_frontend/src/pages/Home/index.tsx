import { Add, Article, Image, Videocam } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard";
import StoryCircle from "../../components/StoryCircle";
import CreatePostForm from "../../forms/CreatePost";
import { SEARCH_USER_FAILURE } from "../../redux/auth/auth.actionType";
import { getAllPostAction } from "../../redux/post/post.action";

const story = [1, 2, 3, 4];

const Home = () => {
  const { auth }: any = useSelector((store) => store);
  const { post }: any = useSelector((store) => store);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllPostAction()(dispatch);
  }, [post.post]);
  useEffect(() => {
    dispatch({ type: SEARCH_USER_FAILURE });
  }, []);
  // console.log(post);
  return (
    <div className="bg-transparent lg:w-3/4 md:w-5/6 w-full">
      <section className="flex flex-wrap items-center p-5 max-w-screen overflow-auto rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: "4rem", height: "4rem" }}
            // src='https://i.postimg.cc/HsNS3tY3/image.jpg'
          >
            <Add sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((index) => (
          <StoryCircle key={index} />
        ))}
      </section>

      <Card
        sx={{
          backgroundColor: "transparent",
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "0px 0px 4px rgba(255, 255, 255, 0.5)",
        }}
        className="p-5"
      >
        <div className="flex  justify-between gap-5">
          <Avatar src={auth.user.avatar} />
          <CreatePostForm
            user={auth.user}
            children={
              <input
                title="createPost"
                name="createPost"
                type="text"
                placeholder="The interesting thing today is..."
                readOnly
                className="outline-none input-placeholder-style w-full h-full rounded-full px-5 bg-transparent border border-[#ffffff]"
              />
            }
          />
        </div>
        <div className="flex justify-center space-x-9">
          <div>
            <CreatePostForm
              user={auth.user}
              children={
                <>
                  <IconButton color="inherit">
                    <Image />
                  </IconButton>
                  <span>media</span>
                </>
              }
            />
          </div>
          <div>
            <CreatePostForm
              user={auth.user}
              children={
                <>
                  <IconButton color="inherit">
                    <Videocam />
                  </IconButton>
                  <span>video</span>
                </>
              }
            />
          </div>
          <div>
            <CreatePostForm
              user={auth.user}
              children={
                <>
                  <IconButton color="inherit">
                    <Article />
                  </IconButton>
                  <span>Write Article</span>
                </>
              }
            />
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts.map((pos: any, index: any) => (
          <PostCard user={auth.user} key={index} post={pos} />
        ))}
      </div>
    </div>
  );
};

export default Home;
