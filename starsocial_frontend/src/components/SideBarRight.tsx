import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSuggestAction } from "../redux/auth/auth.action";
import Loading from "./Loading";
import PopularUserCard from "./PopularUserCard";
import SearchUser from "./SearchUser";

const SideBarRight = () => {
  const dispatch = useDispatch();
  const { auth }: any = useSelector((store) => store);

  useEffect(() => {
    getUserSuggestAction()(dispatch);
  }, [auth.user]);

  return (
    <div className="pr-5 flex flex-col justify-start gap-5 py-10">
      <SearchUser />
      <div>
        <div className="flex justify-between py-5 items-center text-white">
          <p className="font-semibold opacity-70">Suggestions for you</p>
        </div>
        <div className="space-y-5">
          {auth.suggestUsers ? (
            auth.suggestUsers.map((item: any) => (
              <PopularUserCard key={item.id} user={item} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarRight;
