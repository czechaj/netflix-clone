import { FC } from "react";

type Props = {
  label: string;
};

export const NavbarItem: FC<Props> = (props) => {
  const { label } = props;
  return (
    <div className="text-white cursor-pointer hover:text-slate-300 transition">
      {label}
    </div>
  );
};
