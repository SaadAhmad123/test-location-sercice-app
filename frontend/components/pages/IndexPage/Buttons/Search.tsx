import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../Loaders/Spinner";

interface ISearch {
  onClick?: () => void;
  loading?: boolean;
}

const Search = ({ onClick, loading }: ISearch) => {
  return (
    <button
      className="py-2 px-6 bg-blue-700 text-white rounded-full text-lg block hover:bg-blue-900 transition-all ease-in duration-100 flex items-center"
      onClick={onClick}
    >
      <span className="mr-2 flex items-center">
        {loading ? (
          <Spinner height={20} width={20} />
        ) : (
          <FontAwesomeIcon icon={faSearch} />
        )}
      </span>
      <span>Search</span>
    </button>
  );
};

export default Search;
