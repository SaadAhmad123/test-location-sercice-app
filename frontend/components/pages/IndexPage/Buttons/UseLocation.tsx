import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocation} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Spinner from "../../../Loaders/Spinner";

interface IUseLocation {
    onClick?: () => void
    loading?: boolean
}

const UseLocation = ({onClick, loading} : IUseLocation) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-100 px-4 py-2 rounded-full text-gray-700 hover:bg-blue-200 transition-all ease-in duration-100 flex items-center"
        >
                <span className="mr-2 flex items-center">
                  {
                      loading ? (<Spinner foregroundColor={"#1e3a8a"} backgroundColor={"white"}/>) : (<FontAwesomeIcon icon={faLocation} />)
                  }
                </span>
            <span>Current location</span>
        </button>
    )
}

export default UseLocation