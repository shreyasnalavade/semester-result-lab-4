import React from "react";

function ResultTable({ subjects, handleMarksChange }) {
  return (
    <section className="card">
      <h2>Subject Marks</h2>

      <div className="table-container">
        <table>

          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Subject</th>
              <th>MSE / 30</th>
              <th>ESE / 70</th>
              <th>Total / 100</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => {
              const mse = Number(subject.mse) || 0;
              const ese = Number(subject.ese) || 0;

              return (
                <tr key={subject.id}>

                  <td>{subject.id}</td>

                  <td className="subject-name">
                    {subject.name}
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={subject.mse}
                      onChange={(e) =>
                        handleMarksChange(
                          subject.id,
                          "mse",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="70"
                      value={subject.ese}
                      onChange={(e) =>
                        handleMarksChange(
                          subject.id,
                          "ese",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="total">
                    {mse + ese}
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </section>
  );
}

export default ResultTable;