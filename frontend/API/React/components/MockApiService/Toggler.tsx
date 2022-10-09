import React, {useEffect, useRef, useState} from "react";
import {localStorageConfig} from "./localStorage.config";

const Toggler = () => {
  const {KEY, TRUE, FALSE} = localStorageConfig
  const [mock, setMock] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    if (!window?.localStorage) return
    mounted.current = true
      const useMock = window?.localStorage?.getItem?.(KEY) === TRUE
    setMock(useMock)
  }, [mock, mounted]);

  const handleToggle = () => {
      if (!window?.confirm("Is it okay to reload the page to configure the mock API service?")) return
      window?.localStorage?.setItem(KEY, !mock ? TRUE: FALSE)
      window?.location?.reload()
  }

  return (
    <div
      style={{
        background: "#fef3c7",
        position: "absolute",
        bottom: 0,
        right: "28px",
        zIndex: 1000,
        padding: "4px 12px 4px 12px",
        border: "1px solid #bbb",
        borderBottom: "0",
        fontSize: "12px",
        color: "#555",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
    >
      <p onClick={handleToggle} style={{cursor: "pointer"}}>
          <strong>{mock ? "STOP" : "START"}</strong> Mock API
      </p>
    </div>
  );
};

export default Toggler;
