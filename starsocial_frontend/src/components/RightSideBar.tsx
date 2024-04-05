import PopularUserCard from './PopularUserCard';
import SearchUser from './SearchUser';

const popularUser = [1, 2, 3, 4, 5];
const RightSideBar = () => {
  return (
    <div className='pr-5 flex flex-col justify-start gap-5 py-10'>
      <SearchUser />
      <div>
        <div className='flex justify-between py-5 items-center text-white'>
          <p className='font-semibold opacity-70'>Suggestions for you</p>
        </div>
        <div className='space-y-5'>
          {popularUser.map(index => (
            <PopularUserCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
