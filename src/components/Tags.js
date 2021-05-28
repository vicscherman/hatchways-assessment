import React, { useState, useEffect } from "react";

const Tags = ({ enteredTags, studentId, parentTags, deletedTags }) => {
  // for simple error handling messages(user invalid inputs etc)
  const [error, setError] = useState(false);
  // for generating and displaying a tag. This will get passed info from the parent
  const [tags, setTags] = useState([]);



  // causes our tags to render on screen if there are tags stored in the student list. This means tags will reappear 
  //onscreen if a search temporarily hides them, for instance
  useEffect(() => {
    if (parentTags) {
      setTags(parentTags);
  
     
    }
 
    
  }, [parentTags]);

  const addTags = (event) => {
    // check to see that it's not a blank tag or one that already exists, display feedback to user
    if (event.key === "Enter" && event.target.value !== "") {
      if ([...tags].includes(event.target.value) && event.target.value !== "") {
        setError(true);
      }

      //if  our tag input doesn't match anything in our tags state we can add the tag (prevent duplicate entries), then clear the box at the end
      if ([...tags].includes(event.target.value) === false) {
        setError(false);
      //  Passes the tags over to the parent component where it's added to the student list, then passed back here to get printed on screen
        enteredTags(event.target.value, studentId);
       

        event.target.value = "";
      }
    }
  };


  const removeTags = (indexToRemove,tag, studentId) => {

setTags(tags.filter((_, index) => index !== indexToRemove));

 deletedTags( tag, studentId)




  
  }






  const renderTags = tags
    ? tags.map((tag, index ) => {
        return (
          <li key={index} className="individual-tag">
            <span  id={`${tag} exists`} className="ui blue tag label">
              {tag}
              <i className="delete icon" onClick={() => removeTags(index,tag, studentId) }></i>
            </span>
          
            
          </li>
        );
      })
    : "";

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

      <ul>{tags && renderTags}</ul>
    </div>
  );
};

export default Tags;
