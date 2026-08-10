import React from "react";

function StudentForm({
  student,
  handleStudentChange
}) {

  return (
    <section className="card">

      <h2>Student Information</h2>

      <div className="form-grid">

        {/* Student Name */}

        <div className="form-group">

  <label>Student Name</label>

  <input
    type="text"
    name="name"
    placeholder="Example: Sakshi Jannawar"
    value={student.name}
    onChange={(e) => {

      const value = e.target.value
        .replace(/[^A-Za-z ]/g, "");

      handleStudentChange({
        target: {
          name: "name",
          value: value
        }
      });

    }}
  />

  <small className="input-help">
    Enter at least first name and last name
  </small>

</div>


        {/* PRN */}

        <div className="form-group">

          <label>PRN</label>

          <input
            type="text"
            name="prn"
            placeholder="Example: 22612345"
            value={student.prn}
            maxLength="8"
            inputMode="numeric"

            onChange={(e) => {

              const value =
                e.target.value.replace(/\D/g, "");

              handleStudentChange({
                target: {
                  name: "prn",
                  value: value
                }
              });

            }}
          />

          <small className="input-help">
            8 digits: 1/2 + year suffix (00-26) + 5 digits
          </small>

        </div>


        {/* Class */}

        <div className="form-group">

          <label>Class</label>

          <input
            type="text"
            name="className"
            placeholder="Example: TY-CSAI-A"
            value={student.className}

            onChange={(e) => {

              handleStudentChange({
                target: {
                  name: "className",
                  value: e.target.value.toUpperCase()
                }
              });

            }}
          />

          <small className="input-help">
            FY/SY/TY/BT - Department - Division A-J
          </small>

        </div>

      </div>

    </section>
  );
}

export default StudentForm;