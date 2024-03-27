import {Grid} from '@mui/material';
import RightSideBar from '../../components/RightSideBar';
import SideBar from '../../components/SideBar';

function Layout({children}: any) {
  return (
    <div className='bg-black'>
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className='sticky top-0'>
            <SideBar />
          </div>
        </Grid>
        <Grid
          lg={location.pathname === '/' ? 6 : 9}
          item
          className='px-5 flex justify-center'
          xs={12}
        >
          {children}
        </Grid>
        {location.pathname === '/' ? (
          <Grid item lg={3}>
            <div className='relative'>
              <RightSideBar />
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

export default Layout;
