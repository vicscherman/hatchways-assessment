import React, { useState, useEffect } from "react";

const Tags = (props) => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);

  // useEffect(()=> {
  //     if(props.tags){
  //         setTags(props.tags)
  //       }

  // },[])

  const addTags = (event) => {
    // check to see that it's not a blank tag or one that already exists, display feedback to user
    if (event.key === "Enter" && event.target.value !== "") {
      if ([...tags].includes(event.target.value) && event.target.value !== "") {
        setError(true);
      }

      //if  our search input doesn't match anything in our tags state we can add the tag (prevent duplicate entries), then clear the box at the end
      if ([...tags].includes(event.target.value) === false) {
        setError(false);
        setTags([...tags, event.target.value]);
        props.enteredTags([...tags, event.target.value]);
        event.target.value = "";
      }
    }
  };
  //removes tags on click
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const renderTags = tags.map((tag, index) => {
    return (
      <li key={index} className="individual-tag">
        <a className="ui blue tag label">
          {tag}{" "}
          <i className="delete icon" onClick={() => removeTags(index)}></i>
        </a>
      </li>
    );
  });

  return (
    <div className="container tag-input">
      <div className="ui right labeled left icon input">
        <i class="tags icon"></i>
        <input
          type="text"
          placeholder="Press Enter to add tags"
          onKeyDown={(e) => (e.key === "Backspace" ? setError(false) : null)}
          onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
        />
      </div>
      <div className="error-box">
        <p className="error-message">{`${
          error ? "Tag Already Exists!" : ""
        }`}</p>
      </div>

      <ul>{renderTags}</ul>
    </div>
  );
};

export default Tags;
