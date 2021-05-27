import React, { useEffect, useState } from "react";
import "./Studentinfo.css";
import axios from "axios";
import Accordion from "./Accordion";
import Tags from "./Tags";
import SearchBar from "./SearchBar";

const StudentInfo = () => {
  const [studentList, setSetudentList] = useState([]);
  const URL = "https://api.hatchways.io/assessment/students";
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const enteredTags = (tag, studentId) => {
    const newStudentList = [...studentList];
    setSetudentList(
      newStudentList.filter((value) => {
        if (value.id === studentId) {
          if (!value.tag) {
            value.tag = [tag];
          } else {
            value.tag = [...value.tag, tag];
          }
        }
        return newStudentList;
      })
    );
 
  };

  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
  };

  const handleTagSearch = (event) => {
    setSearchTag(event.target.value);
  };
  // To keep our name and tag search synchronous
  useEffect(() => {
    if (searchName) {
      setSearchName(searchName);
    }
    if (searchTag) {
      setSearchTag(searchTag);
    }
  }, [searchName, searchTag]);

  // For fetching our student list on load and not when anything else changes
  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get(URL);
      setSetudentList(res.data.students);
    };

    getStudents();
  }, []);
  // function for searching student list
  const searchFilter = (studentList) => {
    return studentList.filter((student) => {
      let existingName = `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .trim();
      let tagsString = student.tag ? student.tag.toString() : "";


      if (searchName === "" && searchTag === "") {
        return true;
      } else if (
        existingName.toLowerCase().trim().includes(searchName.toLowerCase()) &&
        !searchTag
      ) {
        return true;
      } else if (
        tagsString &&
        existingName.toLowerCase().trim().includes(searchName.toLowerCase()) &&
        tagsString.toLowerCase().includes(searchTag.toLowerCase())
      ) {
        return true;
      } else if (
        tagsString &&
        !searchName &&
        tagsString.toLowerCase().includes(searchTag.toLowerCase())
      ) {
        return true;
      }
      return false;

      //   tagsArray.map((tag) => {
      //     if (searchTag === "") {
      //       return true;
      //     } else if (tag.toLowerCase().trim().includes(searchTag.toLowerCase())) {
      //       return true;
      //     }
      //   });
    });
  };

  const renderedStudents = searchFilter(studentList).map((student) => {
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
      <div className="student-card" key={student.id}>
        <div className="picture">
          <img className="ui-image" src={student.pic} alt="studentPicture"></img>
        </div>
        <div className="student-info">
          <h2 className="student-name" key={student.id}>
            {student.firstName} {student.lastName}
          </h2>
          <li>Email: {student.email}</li>
          <li>Company: {student.company}</li>
          <li>Skill: {student.skill}</li>
          <li>Average: {getAverage(student.grades)}%</li>
          <Accordion grades={student.grades} />
          <Tags
            enteredTags={enteredTags}
            studentId={student.id}
            parentTags={student.tag ? student.tag : ''}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="border-box">
      <SearchBar filterFunction={handleNameSearch} type={"name"} />
      <SearchBar filterFunction={handleTagSearch} type={"tag"} />

      <div>{renderedStudents}</div>
    </div>
  );
};

export default StudentInfo;
