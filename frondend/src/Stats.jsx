import React, { useEffect, useState } from "react";
import { getStudents } from "./api";

function Stats({ refresh }) {
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  const load = async () => {
    const res = await getStudents();

    const data = res.data;

    setTotal(data.length);

    const gpa =
      data.reduce((sum, s) => sum + parseFloat(s.gpa || 0), 0) / data.length ||
      0;

    setAvg(gpa.toFixed(2));
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const exportCSV = async () => {
    const res = await getStudents();

    const data = res.data;

    const csv =
      "ID,Name,Major,GPA\n" +
      data
        .map((s) => `${s.student_id},${s.name},${s.major},${s.gpa}`)
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "students.csv";

    a.click();
  };

  return (
    <div className="card">
      <h3>Statistics</h3>

      <p>Total Students: {total}</p>

      <p>Average GPA: {avg}</p>

      <button className="btn export" onClick={exportCSV}>
        Export CSV
      </button>
    </div>
  );
}

export default Stats;