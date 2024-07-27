import { useEffect, useState } from "react";
import StudentTable from "../../components/student/StudentTable";
import StudentForm from "../../components/student/StudentForm";
import { Button } from "@mui/material";
import axios from "axios";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  const addStudent = () => {
    setEditingStudent({ name: "", email: "", enrolledQuizzes: [] });
  };

  const saveStudent = (student) => {
    if (student.id) {
      axios
        .put(`http://localhost:5000/students/${student.id}`, student)
        .then(() => {
          setStudents(students.map((s) => (s.id === student.id ? student : s)));
          setEditingStudent(null);
          alert("Student updated successfully!");
        })
        .catch((error) => {
          console.error("There was an error updating the student!", error);
        });
    } else {
      axios
        .post("http://localhost:5000/students", { ...student, id: Date.now() })
        .then((response) => {
          setStudents([...students, response.data]);
          setEditingStudent(null);
          alert("Student added successfully!");
        })
        .catch((error) => {
          console.error("There was an error adding the student!", error);
        });
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
        alert("Student deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the student!", error);
      });
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
        {!editingStudent ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={addStudent}
              className="mb-4"
            >
              Add Student
            </Button>
            <StudentTable
              students={students}
              onEdit={editStudent}
              onDelete={deleteStudent}
            />
          </>
        ) : (
          <StudentForm
            student={editingStudent}
            onSave={saveStudent}
            onCancel={cancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ManageStudent;
