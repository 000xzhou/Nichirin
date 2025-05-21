import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

function Dropdown({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropbox if user clicks outside of dropbox
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>

      {isOpen && <div>{children}</div>}
    </div>
  );
}

export default Dropdown;
