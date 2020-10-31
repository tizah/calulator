import react, { useState, useEffect } from "react";
import * as maths from "mathjs";
import firebase from "firebase";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import ClearButton from "./components/ClearButton/ClearButton";
import db from "./firebase";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const insertInput = (val) => {
    setInput((prev) => prev + val);
  };

  const calculate = async () => {
    try {
      setInput(() => maths.evaluate(input));
      const data = {
        inputs: input,
        result: maths.evaluate(input),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const res = await db.collection("calculations").doc().set(data);
    } catch (err) {
      console.log({ err });
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const calculationLogs = await db
        .collection("calculations")
        .orderBy("createdAt", "desc")
        .limit(10);
      const snapshot = await calculationLogs.onSnapshot((snap) => {
        const calculations = snap.docs.map((doc) => {
          return doc.data();
        });
        // console.log({ snapshot });
        setResults(calculations);
      });
    };

    fetchData();
    setLoading(false);
  }, [setResults, setLoading]);

  const showData = () => {
    return (
      results &&
      results.map((x, i) => {
        <div>{i}</div>;
      })
    );
  };

  return (
    <>
      <h1 class="row justify-content-center align-self-center"> Calculator </h1>
      <div className="app">
        <div className="calc-wrapper">
          <Input input={input}></Input>
          <div className="row">
            <Button handleClick={insertInput}>7</Button>
            <Button handleClick={insertInput}>8</Button>
            <Button handleClick={insertInput}>9</Button>
            <Button handleClick={insertInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={insertInput}>4</Button>
            <Button handleClick={insertInput}>5</Button>
            <Button handleClick={insertInput}>6</Button>
            <Button handleClick={insertInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={insertInput}>1</Button>
            <Button handleClick={insertInput}>2</Button>
            <Button handleClick={insertInput}>3</Button>
            <Button handleClick={insertInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={insertInput}>.</Button>
            <Button handleClick={insertInput}>0</Button>
            <Button handleClick={() => calculate()}>=</Button>
            <Button handleClick={insertInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton
              handleClear={() => {
                setInput(() => "");
              }}
            >
              Clear{" "}
            </ClearButton>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Input</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {results &&
              results.map((result, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{result.inputs}</td>
                    <td>{result.result}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
