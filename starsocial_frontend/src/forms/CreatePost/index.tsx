import { Close, Image, Videocam } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  CardHeader,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createPostAction } from "../../redux/post/post.action";
import { showToast } from "../../ultis/showToast";
import { uploadToCLoudinary } from "../../ultis/uploadToCloudinary";

const initialValues = {
  caption: "",
  image: [null],
  video: [null],
};

const validationSchema = Yup.object().shape({
  caption: Yup.string().trim().required("Caption is required"),
});

const CreatePostForm = ({ user, children }: any) => {
  const [file, setFile] = useState([""]);
  const [video, setVideo] = useState([""]);
  const [reviewImg, setReviewImg] = useState([""]);
  const [reviewVideo, setReviewVideo] = useState([""]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setReviewImg([""]);
    setReviewVideo([""]);
    setFile([""]);
    setVideo([""]);
    setOpen(false);
  };

  const handleUploadImage = async (value: any) => {
    setLoading(true);
    if (value.length > 6) {
      showToast("Image upload limits is 5", "error");
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
      setFile(value);
    }
    setLoading(false);
  };
  const handleUploadVideo = async (value: any) => {
    setLoading(true);

    if (value.length > 3) {
      showToast("Video upload limits is 3", "error");
    } else {
      let urls: string[] = [];
      for (const file of value) {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            urls.push(reader.result as string);
            setReviewVideo([...urls]);
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }
      setVideo(value);
    }
    setLoading(false);
  };

  const handleSubmit = async (value: any) => {
    handleClose();
    setLoading(true);

    value.image = await uploadToCLoudinary(file, "image");
    value.video = await uploadToCLoudinary(video, "video");

    console.log("hanlde submit", value);
    createPostAction(value)(dispatch);
    setLoading(false);
  };

  return (
    <>
      <button
        className="w-full flex items-center"
        type="button"
        onClick={handleOpen}
      >
        {children}
      </button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ zIndex: 1500 }}
        >
          <div className="modal p-4 max-h-screen overflow-auto h-fit lg:w-fit md:w-fit w-full">
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form className="space-y-5">
                <div className="space-y-5">
                  <CardHeader
                    avatar={
                      <Avatar
                        src={user.avatar}
                        sx={{ bgcolor: "transparent" }}
                        aria-label="recipe"
                      />
                    }
                    title={user.firstName + " " + user.lastName}
                    subheader={new Date().toDateString()}
                    subheaderTypographyProps={{
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                    action={
                      <IconButton onClick={handleClose} color="error">
                        <Close color="inherit" />
                      </IconButton>
                    }
                    className="lg:w-[30rem] w-full"
                  />
                  <div>
                    <Field
                      as={TextField}
                      name="caption"
                      label="Caption"
                      type="text"
                      fullWidth
                      multiline={true}
                      rows={4}
                      sx={{
                        // Chỉnh màu label
                        "& .MuiInputLabel-root": {
                          color: "#9ea4c0",
                        },
                        "& .MuiInputBase-input": {
                          color: "rgb(255, 255, 255)",
                        },
                      }}
                    />
                    <ErrorMessage
                      name="caption"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-5 space-x-5">
                  <div className="flex flex-row gap-5">
                    <input
                      id="image"
                      name="image"
                      accept="image/*"
                      type="file"
                      onChange={(e: any) => handleUploadImage(e.target.files)}
                      className="w-full hidden"
                      multiple
                    />
                    <input
                      id="video"
                      name="video"
                      accept="video/*"
                      type="file"
                      onChange={(e: any) => handleUploadVideo(e.target.files)}
                      className="w-full hidden"
                      multiple
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <IconButton color="primary">
                        <Image />
                      </IconButton>
                      <span>media</span>
                    </label>
                    <label htmlFor="video" className="cursor-pointer">
                      <IconButton color="primary">
                        <Videocam />
                      </IconButton>
                      <span>video</span>
                    </label>
                  </div>
                </div>
                <div className="overflow-auto max-h-[10rem] lg:w-[30rem] w-full">
                  {reviewImg[0] !== "" && (
                    <ImageList variant="masonry" cols={3} gap={8}>
                      {reviewImg.map((img, index) => (
                        <ImageListItem key={index}>
                          <img
                            className="h-[10rem] w-[10rem] object-cover object-center"
                            src={img}
                            key={index}
                            title={"Review image " + index}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}

                  {reviewVideo[0] !== "" &&
                    reviewVideo.map((video, index) => (
                      <video
                        className="h-[10rem] w-[10rem] object-cover object-center"
                        src={video}
                        key={index}
                        autoPlay
                        loop
                        muted
                        title={"Review video " + index}
                      />
                    ))}
                </div>
                <Button
                  sx={{ padding: ".8rem 0rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Post
                </Button>
              </Form>
            </Formik>
          </div>
        </Modal>
        <Backdrop
          sx={{ color: "#fff", zIndex: 1400, position: "absolute" }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};
export default CreatePostForm;
