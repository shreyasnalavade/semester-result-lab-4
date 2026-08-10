import React, { useState } from "react";

import StudentForm from "./components/StudentForm";
import ResultTable from "./components/ResultTable";
import ResultSummary from "./components/ResultSummary";

import "./App.css";

function App() {

  const [student, setStudent] = useState({
    name: "",
    prn: "",
    className: ""
  });

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Data Structures and Algorithms",
      mse: "",
      ese: ""
    },
    {
      id: 2,
      name: "Database Management Systems",
      mse: "",
      ese: ""
    },
    {
      id: 3,
      name: "Computer Networks",
      mse: "",
      ese: ""
    },
    {
      id: 4,
      name: "Web Technology",
      mse: "",
      ese: ""
    }
  ]);

  const [showResult, setShowResult] = useState(false);

  const handleStudentChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

    setShowResult(false);
  };

  const handleMarksChange = (id, field, value) => {

    if (field === "mse" && Number(value) > 30) {
      return;
    }

    if (field === "ese" && Number(value) > 70) {
      return;
    }

    if (Number(value) < 0) {
      return;
    }

    setSubjects(
      subjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value
            }
          : subject
      )
    );

    setShowResult(false);
  };

  const validatePRN = (prn) => {
  const currentYearSuffix = new Date()
    .getFullYear()
    .toString()
    .slice(-2);

  const maxYear = parseInt(currentYearSuffix, 10);

  const prnPattern = /^([12])(\d{2})(\d{5})$/;

  const match = prn.match(prnPattern);

  if (!match) {
    return false;
  }

  const yearSuffix = parseInt(match[2], 10);

  return yearSuffix >= 0 && yearSuffix <= maxYear;
};


const validateClass = (className) => {

  const classPattern =
    /^(FY|SY|TY|BT)-(CE|IT|CSAI|CSAIML|CSDS|CSAIDS|CSIOT|IC|ME|ENTC)-([A-J])$/;

  return classPattern.test(
    className.toUpperCase()
  );
};

const validateName = (name) => {
  const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)+$/;

  return namePattern.test(name.trim());
};

  const calculateResult = () => {

  // Student name validation
  if (!student.name.trim()) {
    alert("Please enter student name.");
    return;
  }


  // PRN validation
  if (!student.prn.trim()) {
    alert("Please enter PRN.");
    return;
  }


  if (!validatePRN(student.prn.trim())) {

    alert(
      "Invalid PRN.\n\n" +
      "PRN must contain exactly 8 digits.\n" +
      "The first digit must be 1 or 2.\n" +
      "The next two digits must represent a valid year suffix from 00 to 26.\n" +
      "The final five digits can be any digits."
    );

    return;
  }


  // Class validation
  if (!student.name.trim()) {
  alert("Please enter student name.");
  return;
}

if (!validateName(student.name)) {
  alert(
    "Invalid Student Name.\n\n" +
    "Name must contain at least two words.\n" +
    "Only English letters and spaces are allowed.\n\n" +
    "Example: Sakshi Jannawar"
  );

  return;
}


  if (!validateClass(student.className.trim())) {

    alert(
      "Invalid Class.\n\n" +
      "Format: YEAR-DEPARTMENT-DIVISION\n\n" +
      "Example: TY-CSAI-A\n\n" +
      "Valid years: FY, SY, TY, BT\n" +
      "Valid departments: CE, IT, CSAI, CSAIML, CSDS, CSAIDS, CSIOT, IC, ME, ENTC\n" +
      "Valid divisions: A to J"
    );

    return;
  }


  // Marks validation
  const incomplete = subjects.some(
    (subject) =>
      subject.mse === "" ||
      subject.ese === ""
  );


  if (incomplete) {

    alert(
      "Please enter MSE and ESE marks for all subjects."
    );

    return;
  }


  // Show result
  setShowResult(true);
};
  const resetResult = () => {

    setStudent({
      name: "",
      prn: "",
      className: ""
    });

    setSubjects([
      {
        id: 1,
        name: "Data Structures and Algorithms",
        mse: "",
        ese: ""
      },
      {
        id: 2,
        name: "Database Management Systems",
        mse: "",
        ese: ""
      },
      {
        id: 3,
        name: "Computer Networks",
        mse: "",
        ese: ""
      },
      {
        id: 4,
        name: "Web Technology",
        mse: "",
        ese: ""
      }
    ]);

    setShowResult(false);
  };

  return (
    <div className="app">

      <header className="header">

        <div className="header-content">

          <div>
            <h1>VIT Semester Result Portal</h1>

            <p>
              Student Academic Result Management System
            </p>
          </div>

          <div className="vit-badge">
            VIT
          </div>

        </div>

      </header>

      <main className="container">

        <section className="intro">

          <h2>
            Prepare Semester Result
          </h2>

          <p>
            Enter student details and examination
            marks to generate the semester result.
          </p>

        </section>

        <StudentForm
          student={student}
          handleStudentChange={handleStudentChange}
        />

        <ResultTable
          subjects={subjects}
          handleMarksChange={handleMarksChange}
        />

        <div className="button-container">

          <button
            className="calculate-btn"
            onClick={calculateResult}
          >
            Calculate Result
          </button>

          <button
            className="reset-btn"
            onClick={resetResult}
          >
            Reset
          </button>

        </div>

        {showResult && (
          <ResultSummary
            student={student}
            subjects={subjects}
          />
        )}

      </main>

      <footer>
        <p>
          VIT Semester Result Portal | React.js Lab Experiment
        </p>
      </footer>

    </div>
  );
}

export default App;