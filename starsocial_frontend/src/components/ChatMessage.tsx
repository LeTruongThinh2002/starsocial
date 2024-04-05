const ChatMessage = () => {
  return (
    <div
      className={`flex ${true ? 'justify-start' : 'justify-end'} text-white`}
    >
      <div
        className={`p-1 ${
          true ? 'rounded-md' : 'px-5 rounded-full'
        } bg-[#191c29]`}
      >
        {true && (
          <img
            className='w-[12rem] h-[17rem] object-cover object-center'
            alt=''
            src='https://cdn.pixabay.com/photo/2023/06/05/02/01/starry-sky-8041247_1280.jpg'
          />
        )}
        <p className={`${true ? 'py-2' : 'py-1'}`}>message</p>
      </div>
    </div>
  );
};

export default ChatMessage;
