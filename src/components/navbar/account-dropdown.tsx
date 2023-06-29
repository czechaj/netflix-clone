import Image from "next/image";
import { FC } from "react";

type Props = {
  visible: boolean;
};

export const AccountDropdown: FC<Props> = (props) => {
  const { visible } = props;
  if (!visible) return null;
  return (
    <div className="bg-black absolute w-48 top-8 right-0 flex-col border-2 py-5 border-slate-600">
      <div className="flex flex-col gap-3 text-center">
        <div className="px-3 gap-x-4 group flex items-center w-full">
          <Image
            width={100}
            height={100}
            className="w-8"
            alt="avatar"
            src={"/images/avatar-3.png"}
          />
          <p className="text-white group-hover:underline">{"username"}</p>
        </div>
      </div>
    </div>
  );
};
