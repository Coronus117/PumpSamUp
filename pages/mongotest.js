import React, { useState } from "react";

const Mongotest = () => {
  const [list, setList] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = "sam@samtest.com";

    fetch("/api/mongotest", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const showHandler = (event) => {
    event.preventDefault();
    console.log("GET!");
    fetch("/api/mongotest/")
      .then((response) => {
        console.log("response ", response);
        return response.json();
      })
      .then((data) => {
        setList(data.comments);
      });
  };

  return (
    <div className="flex flex-col space-y-6">
      <button onClick={submitHandler} className="bg-gray-100 p-4">
        SUBMIT
      </button>
      <button onClick={showHandler} className="bg-gray-100 p-4">
        SHOW LIST
      </button>
      <div>
        <ul>
          {list && list.map((item) => <li key={item._id}>{item.email}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Mongotest;
