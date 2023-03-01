import React from "react";
import { useRef, useState } from "react";

const Feedback = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [individualFeedbackData, setIndividualFeedbackData] = useState();

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    // Check if input is empty!
    // Error checking goes here!

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("data ", data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  };

  const loadSpecificFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setIndividualFeedbackData(data.feedback));
  };

  return (
    <div>
      <h1>Feedback</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadSpecificFeedbackHandler(item.id)}>
              {" "}
              Show Details
            </button>
            {individualFeedbackData && <p>{individualFeedbackData.email}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
