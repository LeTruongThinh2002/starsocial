import {Input} from '@mui/material';

const SearchUser = () => {
  return (
    <Input
      placeholder='search user...'
      type='text'
      sx={{
        color: 'white',
        backgroundColor: '#101010',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px'
      }}
      disableUnderline
    />
  );
};

export default SearchUser;
