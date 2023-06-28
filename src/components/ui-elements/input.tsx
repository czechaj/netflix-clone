import { FC, FormEvent } from "react";

type Props = {
  id: string;
  value: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
};

export const Input: FC<Props> = (props: Props) => {
  const { id, label, onChange, value, type } = props;
  return (
    <div className="relative">
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="block w-full px-6 pt-5 pb-1 rounded-md bg-neutral-700 text-base text-white focus:outline-none focus:ring-0 peer"
        id={id}
        placeholder=" "
      />
      <label
        className="absolute text-sm leading-tight left-4 top-4 text-zinc-400 duration-200 transform -translate-y-3 scale-75 origin-center z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
