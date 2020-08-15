import React, { useState } from "react";
import { Link } from "react-router-dom";

const SaveScoreForm = ({ score }) => {
  const [username, setUsername] = useState("");

  const handleChange = e => {
    const updatedUsername = e.target.value;
    setUsername(updatedUsername);
  };

  const saveHighScore = e => {
    e.preventDefault();
    const record = {
      name: username,
      score
    };
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
          placeholder="your name"
        />
        <button type="submit" className="btn" disabled={!username}>
          Save
        </button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
};

export default SaveScoreForm;
