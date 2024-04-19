import { Videocam } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  CardHeader,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { uploadToCLoudinary } from "../../ultis/uploadToCloudinary";
import { createReel } from "../../redux/reel/reel.action";

const initialValues = {
  title: "",
  video: [null],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
});

const CreateReelsForm = ({ user, children }: any) => {
  const [video, setVideo] = useState([""]);
  const [reviewVideo, setReviewVideo] = useState([""]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setReviewVideo([""]);
    setVideo([""]);
    setOpen(false);
  };

  const handleUploadVideo = async (value: any) => {
    setLoading(true);
    let urls: string[] = [];

    try {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result as string);
        setReviewVideo([...urls]);
      };
      reader.readAsDataURL(value);
    } catch (error) {
      console.error("Error reading file:", error);
    }
    setVideo(value);
    setLoading(false);
  };

  const handleSubmit = async (value: any) => {
    handleClose();
    setLoading(true);

    value.video = (await uploadToCLoudinary(video, "video"))[0];

    console.log("hanlde submit", value);
    createReel(value)(dispatch);
    setLoading(false);
  };

  return (
    <>
      <button className="w-full" type="button" onClick={handleOpen}>
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
          <div className="modal p-4 lg:w-fit md:w-fit w-full">
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
                    sx={{ width: "30rem" }}
                  />
                  <div>
                    <Field
                      as={TextField}
                      name="title"
                      label="Title"
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
                      name="title"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-5 space-x-5">
                  <div className="flex flex-row gap-5">
                    <input
                      id="video"
                      name="video"
                      accept="video/*"
                      type="file"
                      onChange={(e: any) => handleUploadVideo(e.target.files)}
                      className="w-full hidden"
                      multiple
                    />

                    <label htmlFor="video" className="cursor-pointer">
                      <IconButton color="primary">
                        <Videocam />
                      </IconButton>
                      <span>video</span>
                    </label>
                  </div>
                </div>
                <div className="overflow-auto max-h-[20rem]">
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
export default CreateReelsForm;
