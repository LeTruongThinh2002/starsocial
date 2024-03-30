import Input from '@mui/material/Input';

const SearchUser = () => {
  return (
    <Input
      placeholder='search user...'
      type='text'
      sx={{
        color: 'white',
        backgroundColor: '#101010',
        padding: '10px',

        borderRadius: '10px'
      }}
      disableUnderline
    />
  );
};

export default SearchUser;
