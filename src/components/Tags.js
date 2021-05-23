import React, { useState , useEffect} from "react";

const Tags = (props) => {
  const [tags, setTags] = useState(['john', 'bill']);

  useEffect(()=> {
      if(props.tags){
          setTags(props.tags)
        }
       
       
       
      
  },[]) 
 
  const addTags =(event) => {
      if(event.key === "Enter" && event.target.value !== ""){
     setTags([...tags, event.target.value]);
     props.selected([...tags, event.target.value],props.id)
     
    event.target.value = ""}
  }

  const removeTags = (indexToRemove) => {
      setTags(tags.filter((_, index)=> index !== indexToRemove ))
  }

  const renderTags = tags.map((tag, index) => {
      return (
        <li key={index}>
        <a className="ui blue tag label">{tag} <i className="delete icon" onClick={()=> removeTags(index)}></i></a>
      </li>
      )
  })

  return (
    <div className="container">

        <div className="ui right labeled left icon input">
            <i class="tags icon"></i>
            <input type="text" placeholder ="Press Enter to add tags"  onKeyUp={e => (e.key === "Enter" ? addTags(e): null)}/>
           
        </div>

      <ul>
          {renderTags}
      

      </ul>
    </div>
  );
};

export default Tags;
