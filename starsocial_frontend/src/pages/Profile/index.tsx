import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import PostCard from "../../components/PostCard";
import ProfileModal from "../../components/ProfileModal";
import ReelCard from "../../components/ReelCard";
import {
  followUserAction,
  getProfileByIdAction,
} from "../../redux/auth/auth.action";
import { getUserPostAction } from "../../redux/post/post.action";

const tabs = [
  { value: "posts", name: "Posts" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "stories", name: "Stories" },
];

const reels = [1, 2, 3, 4, 5];
const Profile = () => {
  const { id } = useParams();
  const { auth, post }: any = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await getProfileByIdAction(id)(dispatch);
      await getUserPostAction(id)(dispatch);
    };
    fetchData();
  }, [id, post.posts, dispatch]);

  const [value, setValue] = useState("posts");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleFollow = (userId: any) => {
    followUserAction(userId)(dispatch);
  };
  return auth.userById && post.post ? (
    <Card
      className="lg:w-3/4 md:w-5/6 w-full border border-slate-800 rounded-md"
      sx={{ backgroundColor: "transparent" }}
    >
      <div className="rounded-md text-white">
        <div className="h-[15rem]">
          <img
            src={auth.userById.background}
            className="w-full h-full rounded-t-md object-cover object-center"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={auth.userById.avatar}
          />
          {auth.userById && auth.user.id === auth.userById.id ? (
            <ProfileModal user={auth.user} />
          ) : auth.userById &&
            auth.user.followings.includes(auth.userById.id) ? (
            <Button
              onClick={() => handleFollow(auth.userById.id)}
              variant="outlined"
              color="error"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={() => handleFollow(auth.userById.id)}
              variant="outlined"
            >
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {auth.userById.firstName + " " + auth.userById.lastName}
            </h1>
            <p>{auth.userById.gender}</p>
          </div>
          <div className="flex gap-2 items-center py-3">
            <span>{post.post.length} post</span>
            <span>{auth.userById.followers.length} followers</span>
            <span>{auth.userById.followings.length} followings</span>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "darkviolet" }}>
                <TabList onChange={handleChange}>
                  {tabs.map((item, index) => (
                    <Tab
                      key={index}
                      sx={{
                        color: "gray", // Adjust colors as needed
                      }}
                      label={item.name}
                      value={item.value}
                    />
                  ))}
                </TabList>
              </Box>
            </TabContext>
          </Box>
          <div className="flex justify-center">
            {value === "posts" ? (
              <div className="space-y-5 lg:w-3/4 md:w-5/6 w-full px-5 my-5">
                {post.post && auth.userById ? (
                  post.post.map((item: any) => (
                    <div key={item.id}>
                      <PostCard user={auth.user} post={item} />
                    </div>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((index) => (
                  <ReelCard key={index} />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 lg:w-3/4 md:w-5/6 w-full px-5 my-5">
                {auth.userById && auth.userById.savedPost ? (
                  auth.userById.savedPost.map((item: any) => (
                    <div key={item.id}>
                      <PostCard user={auth.user} post={item} />
                    </div>
                  ))
                ) : (
                  <span className="flex w-full h-full justify-center items-center text-gray-500">
                    No saved post!
                  </span>
                )}
              </div>
            ) : (
              <div>Stories</div>
            )}
          </div>
        </section>
      </div>
    </Card>
  ) : (
    <Loading />
  );
};

export default Profile;
