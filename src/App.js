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
  const [validationMessage, setValidationMessage] = useState("");

  const handleStudentChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

    setShowResult(false);
    setValidationMessage("");
  };

  const handleMarksChange = (id, field, value) => {

    const max = field === "mse" ? 30 : 70;
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > max)) {
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
    setValidationMessage("");
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

  return yearSuffix <= maxYear;
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
    const reject = (message) => {
      setValidationMessage(message);
      setShowResult(false);
    };

  // Student name validation
  if (!student.name.trim()) {
    reject("Please enter the student's name.");
    return;
  }


  // PRN validation
  if (!student.prn.trim()) {
    reject("Please enter the PRN.");
    return;
  }


  if (!validatePRN(student.prn.trim())) {

    reject(`Invalid PRN. Use 8 digits: 1 or 2, a year suffix from 00 to ${String(new Date().getFullYear()).slice(-2)}, then 5 digits.`);

    return;
  }


  // Class validation
if (!validateName(student.name)) {
  reject("Enter at least a first and last name using English letters.");

  return;
}


  if (!validateClass(student.className.trim())) {

    reject("Enter a class in YEAR-DEPARTMENT-DIVISION format, for example TY-CSAI-A.");

    return;
  }


  // Marks validation
  const incomplete = subjects.some(
    (subject) =>
      subject.mse === "" ||
      subject.ese === ""
  );


  if (incomplete) {

    reject("Enter MSE and ESE marks for every subject before calculating.");

    return;
  }


  // Show result
  setShowResult(true);
  setValidationMessage("");
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
    setValidationMessage("");
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

        {validationMessage && (
          <p className="validation-message" role="alert">{validationMessage}</p>
        )}

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
