import React, { useEffect, useState } from "react";
import { useFirebase } from "./firebase/FirebaseContext";

const HighScores = () => {
  const firebase = useFirebase();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.scores().once("value", snapshot => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setLoading(false);
    });
  }, []);

  const formatScoreData = firebaseScores => {
    const scores = [];

    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val.key = key;
      scores.push(val);
    }

    scores.sort((a, b) => b.score - a.score).slice(0, 10);

    return scores;
  };

  return (
    <>
      {loading ? (
        <div id="loader"></div>
      ) : (
        <>
          <h1>High scores</h1>
          <div id="highScoresList">
            {scores.map(record => (
              <li key={record.key} className="high-score">
                {record.name} - {record.score}
              </li>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HighScores;
