import React from "react";

interface IToggle {
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

const Toggle: React.FC<IToggle> = ({ checked, onChange }) => {
  return (
    <label
      htmlFor="default-toggle"
      className="block relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id="default-toggle"
        className="sr-only peer"
        onChange={() => onChange?.(!checked)}
        checked={Boolean(checked)}
      />
      <div
        className={`
               w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
               dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-black
               after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
               after:dark:bg-gray-700 
                after:rounded-full after:h-5 after:w-5 
               after:transition-all dark:border-gray-600 peer-checked:bg-white`}
      />
    </label>
  );
};

export default Toggle;
