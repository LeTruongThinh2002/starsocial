import { Close, Search } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import SearchUser from "./SearchUser";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SEARCH_USER_FAILURE } from "../redux/auth/auth.actionType";

export const SideBarTop = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    dispatch({ type: SEARCH_USER_FAILURE });
    setOpen(!open);
  };
  return (
    <>
      <div className="shadow-sm shadow-white h-fit w-screen flex flex-row items-center px-5 py-2 bg-black">
        <Link to={"/"}>
          <h1 className="logo text-center text-3xl playball-regular">
            Star Social
          </h1>
        </Link>
        <Button style={{ marginLeft: "auto" }} onClick={handleOpen}>
          <Search />
        </Button>
      </div>
      <Modal open={open} onClose={handleOpen}>
        <div className="bg-center bg-cover bg-[url('background-h.gif')] right-0 h-screen p-4 md:w-1/2 w-full">
          <div className="w-full flex justify-end">
            <IconButton color="error" onClick={handleOpen} className="right-0">
              <Close />
            </IconButton>
          </div>
          <SearchUser />
        </div>
      </Modal>
    </>
  );
};
