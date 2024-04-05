import Grid from '@mui/material/Grid';
import RightSideBar from '../../components/RightSideBar';
import SideBar from '../../components/SideBar';

function Layout({children}: any) {
  return (
    <div className='bg-black'>
      <Grid container spacing={0}>
        <Grid item xs={0} lg={1}>
          <div className='sticky top-0'>
            <SideBar />
          </div>
        </Grid>
        <Grid
          lg={location.pathname === '/' ? 8 : 11}
          item
          className={
            location.pathname === '/message'
              ? 'flex justify-center'
              : 'px-20 flex justify-center'
          }
          xs={12}
        >
          {children}
        </Grid>
        {location.pathname === '/' ? (
          <Grid item lg={location.pathname === '/' ? 3 : 0}>
            <div className='sticky top-0'>
              <RightSideBar />
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

export default Layout;
