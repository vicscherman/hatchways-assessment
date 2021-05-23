import React, { useEffect, useState } from "react";
import "./Studentinfo.css";
import axios from "axios";
import Accordion from "./Accordion";
import Tags from "./Tags";

const StudentInfo = () => {
  const [studentList, setSetudentList] = useState([]);
  const URL = "https://api.hatchways.io/assessment/students";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState('');
  const selected = (tags, id) => {
    setSetudentList(
      studentList.filter((val) => {
        if (val.id === id) {
          if (!val.tags) {
            val.tags = [tags];
          } else if (val.tags) {
            val.tags = [...val.tags, tags];
          }
        }
        return studentList;
      })
    );
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagSearch = (event) => {
    setSearchTag(event.target.value);
  
  };

  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get(URL);
      setSetudentList(res.data.students);
    };

    getStudents();
  }, []);

  const renderedStudents = studentList
    .filter((val) => {
      // defining name for name search
      let name = `${val.firstName} ${val.lastName}`.toLowerCase();
      let savedTag = val.tags

      // if there is no search term or search tag return everything
      if (searchTerm === "" && searchTag === "") {
        return true;

      } 
      // if There is a search tag bug no tag in the object we discard it
      else if (searchTag && !savedTag) {
   
        return false;
      // if there is a search term, no search tag, and a name match we show the result
      }
    
      else if (
        searchTerm &&
        !searchTag &&
        name.includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      // if there is a saved tag, a name match, and a match with a saved and the searched tag return the result
      else if(
       name.includes(searchTerm.toLowerCase()) && savedTag.filter(tag=>{
          tag.toString().includes(searchTag.toLowerCase())
        })
      ){
        console.log(savedTag[savedTag.length-1].filter(tag=>{
         if(searchTag){
          tag.includes(searchTag)}
          console.log(tag,'tag')
          return searchTag
        }),'search term', searchTag, 'saved tags', savedTag[savedTag.length-1].join(','))
          
        return true
      }

      return false

   

    
      
    })
    .map((student) => {
      //   helper function go get student grades
      const getAverage = (grades) => {
        let sum = 0;
        for (let i = 0; i < grades.length; i++) {
          sum += parseInt(grades[i], 10);
        }
        let avg = sum / grades.length;
        return avg;
      };

      return (
        <div className="student-card">
          <div className="picture">
            <img className="ui-image" src={student.pic} alt="fuck"></img>
          </div>
          <div className="student-info">
            <h2 className="student-name" key={student.id}>
              {student.firstName} {student.lastName}
            </h2>
            <li>Email: {student.email}</li>
            <li>Company: {student.company}</li>
            <li>Skill: {student.skill}</li>
            <li>Average: {getAverage(student.grades)}%</li>
            <Accordion  grades={student.grades} />
            <Tags tags={student.tags? student.tags: ''} selected={selected} id={student.id} />
          </div>
        </div>
      );
    });

  return (
    <div className="border-box">
      <div className="name-search ui big icon input">
        <input
          className="name-search"
          onChange={handleInputChange}
          type="text"
          placeholder="Enter a name.."
        />
        <i className="search icon"></i>
      </div>
      <div className="name-search ui big icon input">
        <input
          className="name-search"
          onChange={handleTagSearch}
          type="text"
          placeholder="Search for a tag.."
        />
        <i className="search icon"></i>
      </div>
      <div>{renderedStudents}</div>
    </div>
  );
};

export default StudentInfo;
