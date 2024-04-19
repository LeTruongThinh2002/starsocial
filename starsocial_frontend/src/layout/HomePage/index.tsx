import Grid from "@mui/material/Grid";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import SideBarRight from "../../components/SideBarRight";
import { SideBarTop } from "../../components/SideBarTop";
import SideBarBottom from "../../components/SideBarBottom";

function Layout({ children }: any) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1240);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1240);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[url('background-h.gif')] bg-cover bg-fixed bg-center">
      <Grid container spacing={0}>
        {isWideScreen ? (
          <Grid item xs={0} lg={1} left={0} position={"fixed"}>
            <SideBar />
          </Grid>
        ) : (
          <Grid zIndex={100} item xs={0} position={"fixed"} top={0}>
            <SideBarTop />
          </Grid>
        )}
        <Grid
          zIndex={99}
          lg={isWideScreen && location.pathname === "/" ? 8 : 12}
          item
          className={`${
            isWideScreen && location.pathname === "/"
              ? "translate-x-1/4"
              : "px-2 py-16 flex justify-center"
          }`}
          xs={12}
        >
          {children}
        </Grid>
        {isWideScreen && location.pathname === "/" && (
          <Grid item xs={0} lg={3} position={"fixed"} right={0}>
            <SideBarRight />
          </Grid>
        )}
        {!isWideScreen && (
          <Grid zIndex={100} item xs={0} position={"fixed"} bottom={0}>
            <SideBarBottom />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Layout;
