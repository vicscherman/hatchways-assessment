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

  // when a tag is entered we take in the tag and the student id and
  const enteredTags = (tag, studentId) => {
    // generate a copy of the student list
    const newStudentList = [...studentList];
    //set the new student list but add in a tags field to them, makes it easier to render the tags later
    setSetudentList(
      newStudentList.filter((student) => {
        // if the student ID matches the student ID of the tag we're entering
        if (student.id === studentId) {
          // if the student doesn't have a tag we create one
          if (!student.tags) {
            student.tags = [tag];
          } else {
            // else we add one
            student.tags = [...student.tags, tag];
          }
        }
        return newStudentList;
      })
    );
  };

  const deletedTags = (tag, studentId) => {
    const newStudentList = [...studentList];

    newStudentList.filter((student) => {
      if (student.id === studentId) {
        if (!student.tags) {
          return false
        } else {
          student.tags = student.tags.filter((element) => element !== tag);
        }
      }
      return newStudentList;
    });
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
      // definining name to search
      let existingName = `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .trim();
      // defining tags to search
      let tagsString = student.tags
        ? student.tags.toString().toLowerCase()
        : "";

      if (searchName === "" && searchTag === "") {
        return true;
      } else if (
        // if there's a name in our list that matches our search term and we're not searching by tag
        existingName.toLowerCase().trim().includes(searchName.toLowerCase()) &&
        !searchTag
      ) {
        return true;
      } else if (
        // there are tags that exist, and there's a match with our name search and a match with our tag search
        tagsString &&
        existingName.toLowerCase().trim().includes(searchName.toLowerCase()) &&
        tagsString.toLowerCase().includes(searchTag.toLowerCase())
      ) {
        return true;
        // if there are tags tags that exist and no search term and there's a match with our tag search
      } else if (
        tagsString &&
        !searchName &&
        tagsString.toLowerCase().includes(searchTag.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  };

  //how to memoize?!!!!!

  const gradesAverage = (grades) => {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
      sum += parseInt(grades[i], 10);
    }
    let avg = sum / grades.length;

    return avg;
  };

  


  const renderedStudents = searchFilter(studentList).map((student) => {
    return (
      <div className="student-card" key={student.id}>
        <div className="picture">
          <img
            className="ui-image"
            src={student.pic}
            alt="studentPicture"
          ></img>
        </div>
        <div className="student-info">
          <h2 className="student-name" key={student.id}>
            {student.firstName} {student.lastName}
          </h2>
          <li>Email: {student.email}</li>
          <li>Company: {student.company}</li>
          <li>Skill: {student.skill}</li>
          <li>Average: {gradesAverage(student.grades)}%</li>       
          <Accordion grades={student.grades} />
          <Tags
            enteredTags={enteredTags}
            deletedTags={deletedTags}
            studentId={student.id}
            parentTags={student.tags ? student.tags : ""}
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
