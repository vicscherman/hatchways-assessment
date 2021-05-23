import React, { useState } from "react";

const Accordion = ({ grades }) => {
  const [open, setOpen] = useState();

  const renderedGrades = grades.map((grade, index) => {
    return (
      <React.Fragment>
        <div className={`content ${open ? "active" : ""} `}>
          Test {index + 1}: {grade}%
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="ui styled accordion">
      <div
        className={`title ${open ? "active" : ""} `}
        onClick={() => setOpen(!open)}
      >
        Test Scores
        <i className="dropdown icon"></i>
      </div>

      {renderedGrades}
    </div>
  );
};

export default Accordion;
