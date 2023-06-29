import { FC } from "react";

type Props = {
  visible: boolean;
};

export const MobileDropdown: FC<Props> = (props) => {
  const { visible } = props;

  if (!visible) return null;

  return (
    <div className="bg-black absolute w-48 top-8 left-0 flex-col border-2 py-5 border-slate-600">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-white px-3 hover:underline">Home</p>
        <p className="text-white px-3 hover:underline">Series</p>
        <p className="text-white px-3 hover:underline">Movies</p>
        <p className="text-white px-3 hover:underline">My List</p>
        <p className="text-white px-3 hover:underline">New & Popular</p>
        <p className="text-white px-3 hover:underline">Browse by Language</p>
      </div>
    </div>
  );
};
