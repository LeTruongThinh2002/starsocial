import {MoreVert} from '@mui/icons-material';
import {Button, IconButton, Menu, MenuItem} from '@mui/material';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {ThemeProvider, createTheme, styled} from '@mui/material/styles';
import React, {useState} from 'react';
import DeletePostModal from './DeletePostModal';

const CTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 15
  }
});

const theme = createTheme({
  palette: {
    background: {
      paper: '#333333'
    }
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white',
          fontSize: 18
        }
      }
    }
  }
});

const MenuDrop = ({handleSetEdit, postId}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    handleSetEdit();
  };
  return (
    <>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
        disableTouchRipple
      >
        <CTooltip title={'Edit Post'} placement='left' arrow>
          <IconButton color='inherit'>
            <MoreVert />
          </IconButton>
        </CTooltip>
      </Button>
      <ThemeProvider theme={theme}>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleEdit();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              //handleClose();
            }}
          >
            <DeletePostModal
              handleCloseModal={handleClose}
              children='Delete'
              postId={postId}
            />
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </>
  );
};

export default MenuDrop;
