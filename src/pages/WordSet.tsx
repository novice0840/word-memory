import React from "react";
// import JLPTword from "./words/JLPTwords.json";
import { useParams } from "react-router-dom";

const WordSetPage = () => {
  const { rate } = useParams();
  //   const words;

  return <div>this is set page {rate}</div>;
};

export default WordSetPage;
