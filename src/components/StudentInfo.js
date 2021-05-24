import React, { useEffect, useState } from "react";
import "./Studentinfo.css";
import axios from "axios";
import Accordion from "./Accordion";
import Tags from "./Tags";
import SearchBar from './SearchBar'

const StudentInfo = () => {
  const [studentList, setSetudentList] = useState([]);
  const URL = "https://api.hatchways.io/assessment/students";
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState([]);




  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
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
  // Filter for first and last name
    .filter((val) => {
      // defining name for name search
      let name = `${val.firstName} ${val.lastName}`.toLowerCase().trim();  
      if (searchName === ""){
        return val
      }else if(name.toLowerCase().trim().includes(searchName.toLowerCase())){
        return val
      }
      // Talk to shane or nick about how to filter by tags 
      
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
      const enteredTags = tags => console.log(tags, student.firstName)
 

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
            {/* What props are actually needed? */}
            <Tags tags={student.tags} enteredTags={enteredTags} id={student.id} />
          </div>
        </div>
      );
    });


  return (

    <div className="border-box">
      <SearchBar  filterFunction={handleNameSearch} type={'name'}/>
      <SearchBar  filterFunction={handleTagSearch} type={'tag'}/>
    
      <div>{renderedStudents}</div>
    </div>
  );
};

export default StudentInfo;
