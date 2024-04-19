import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import { Button as Buttonjoy } from "@mui/joy";
import { Backdrop, CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateProfileAction } from "../redux/auth/auth.action";
import { uploadToCLoudinary } from "../ultis/uploadToCloudinary";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
});

const sx = {
  // Chỉnh màu label
  "& .MuiInputLabel-root": {
    color: "#9ea4c0",
  },
  "& .MuiInputBase-input": {
    color: "rgb(255, 255, 255)",
  },
};

const ProfileModal = ({ user }: any) => {
  let initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    avatar: user.avatar,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gender, setGender] = useState(user.gender);
  const [reviewAvatar, setReviewAvatar] = useState(user.avatar);
  const [avatar, setAvatar] = useState([""]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAvatarChange = (file: any) => {
    let urls: string;
    try {
      const reader = new FileReader();
      reader.onload = () => {
        urls = reader.result as string;
        setReviewAvatar(urls);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file:", error);
    }
    setAvatar(file);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    values.gender = gender;
    values.avatar = (await uploadToCLoudinary([avatar], "image"))[0];
    setReviewAvatar(values.avatar);
    await updateProfileAction(values)(dispatch);
    setLoading(false);
    handleClose();
  };
  const handleChangeGenfer = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Edit Profile
      </Button>
      {!loading ? (
        <Modal
          onClose={handleClose}
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal p-4 lg:w-1/2 md:w-5/6 w-full">
            <Formik
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}
            >
              <Form className="h-fit max-h-screen overflow-auto">
                <div className="h-[30vh]">
                  <img
                    src={user.background}
                    className="w-full h-full rounded-t-md object-cover object-center"
                    alt=""
                  />
                </div>
                <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e: any) => {
                      handleAvatarChange(e.target.files[0]);
                    }} // Add onChange handler
                  />
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer transform -translate-y-24 group relative"
                    style={{ transition: "opacity 0.3s ease-in-out" }}
                  >
                    <Avatar
                      sx={{ width: "10rem", height: "10rem" }}
                      src={reviewAvatar}
                      alt="Current Avatar"
                      className="block group-hover:opacity-50"
                    />
                    <div className="absolute top-0 left-0 w-full h-full font-bold text-xl text-transparent bg-clip-text bg-cover bg-center bg-[url('/logo_text_background.webp')] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Change avatar
                    </div>
                  </label>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <Field
                      as={TextField}
                      name="firstName"
                      label="First name"
                      type="text"
                      variant="standard"
                      fullWidth
                      sx={sx}
                    />
                    <ErrorMessage
                      name="firstName"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Last name"
                      type="text"
                      variant="standard"
                      fullWidth
                      sx={sx}
                    />
                    <ErrorMessage
                      name="lastName"
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <RadioGroup
                    onChange={(event) => handleChangeGenfer(event)}
                    row
                    name="gender"
                    defaultValue={gender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </div>
                <div className="flex flex-row gap-3 p-2 justify-end">
                  <Buttonjoy
                    variant="outlined"
                    type="submit"
                    color="primary"
                    size="lg"
                    //onClick={handleClose}
                  >
                    <CloudDoneRoundedIcon />
                  </Buttonjoy>
                  <Buttonjoy
                    variant="outlined"
                    onClick={handleClose}
                    color="danger"
                    size="lg"
                  >
                    <CloseRoundedIcon />
                  </Buttonjoy>
                </div>
              </Form>
            </Formik>
          </div>
        </Modal>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};
export default ProfileModal;
