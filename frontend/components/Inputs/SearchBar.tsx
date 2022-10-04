import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface ISearchBar {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder }: ISearchBar) => {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FontAwesomeIcon icon={faSearch} color={"gray"} />
      </span>
      <input
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder={placeholder || "Search for anything..."}
        type="text"
        name="search"
      />
    </label>
  );
};

export default SearchBar;
