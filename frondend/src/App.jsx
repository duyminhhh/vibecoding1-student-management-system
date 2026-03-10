import React, { useState } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import Stats from "./Stats";

function App() {

  const [refresh, setRefresh] = useState(false);

  const reload = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container">

      <header className="header">
        <h1>🎓 Student Management System</h1>
        <p>Simple dashboard to manage students</p>
      </header>

      <StudentForm reload={reload} />

      <StudentTable refresh={refresh} reload={reload} />

      <Stats refresh={refresh} />

    </div>
  );
}

export default App;