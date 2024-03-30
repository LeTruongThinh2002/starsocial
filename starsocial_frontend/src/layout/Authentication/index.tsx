import Card from '@mui/material/Card';

const Authentiocation = ({children}: any) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden bg-[url('/star_authenticate_background.gif')] bg-cover bg-center">
      <Card className='p-8 h-fit lg:w-[500px] w-full border-transparent rounded-md border-lg'>
        <div className='pb-5'>
          <h1 className='logo text-center text-5xl playball-regular'>
            Star Social
          </h1>
          <p className='text-center text-sm w-[70&]'>
            Social networks for travelers,
            <br /> discovering and sharing great experiences
          </p>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default Authentiocation;
