import React from "react";

function ResultSummary({ student, subjects }) {

  const totals = subjects.map(
    (subject) =>
      Number(subject.mse) + Number(subject.ese)
  );

  const grandTotal = totals.reduce(
    (sum, total) => sum + total,
    0
  );

  const percentage = (grandTotal / 400) * 100;

  const failed = totals.some(
    (total) => total < 40
  );

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";

    return "F";
  };

  const grade = getGrade(percentage);
  const result = failed ? "FAIL" : "PASS";

  return (
    <section className="result-card">

      <div className="result-header">

        <div>
          <h2>Semester Result</h2>
          <p>Academic Performance Summary</p>
        </div>

        <div
          className={
            result === "PASS"
              ? "result-status pass"
              : "result-status fail"
          }
        >
          {result}
        </div>

      </div>

      <div className="student-result-info">

        <div>
          <span>Student Name</span>
          <strong>{student.name}</strong>
        </div>

        <div>
          <span>PRN</span>
          <strong>{student.prn}</strong>
        </div>

        <div>
          <span>Class</span>
          <strong>{student.className || "N/A"}</strong>
        </div>

      </div>

      <div className="summary-grid">

        <div className="summary-box">
          <span>Grand Total</span>
          <strong>{grandTotal}/400</strong>
        </div>

        <div className="summary-box">
          <span>Percentage</span>
          <strong>{percentage.toFixed(2)}%</strong>
        </div>

        <div className="summary-box">
          <span>Grade</span>
          <strong>{grade}</strong>
        </div>

        <div className="summary-box">
          <span>Result</span>
          <strong>{result}</strong>
        </div>

      </div>

      <div className="performance">

        <h3>Subject-wise Performance</h3>

        {subjects.map((subject) => {

          const total =
            Number(subject.mse) +
            Number(subject.ese);

          return (
            <div
              className="performance-row"
              key={subject.id}
            >

              <span>{subject.name}</span>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${total}%`
                  }}
                ></div>
              </div>

              <strong>{total}/100</strong>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default ResultSummary;