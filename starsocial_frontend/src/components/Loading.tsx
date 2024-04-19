import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="bg-transparent flex justify-center items-center">
      <CircularProgress sx={{ color: "white" }} />
    </div>
  );
};

export default Loading;
