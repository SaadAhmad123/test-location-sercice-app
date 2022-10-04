import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocation} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface IUseLocationButton {
    onClick?: () => void
    loading?: boolean
}

const UseLocationButton = ({onClick, loading} : IUseLocationButton) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-100 px-4 py-2 rounded text-gray-700 hover:bg-blue-200 transition-all ease-in duration-100"
        >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faLocation} />
                </span>
            <span>Current location</span>
        </button>
    )
}

export default UseLocationButton