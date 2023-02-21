import React from "react";

const Button = ({ children }) => {
  return (
    <div className="bg-gray-300 p-4 rounded border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white">
      {children}
    </div>
  );
};

export default Button;
