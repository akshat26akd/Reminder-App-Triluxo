import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../Firebase/Firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import "./Dashboard.css";

function Dashboard() {
  const [reminder, setReminder] = useState({ name: "", date: "", time: "" });
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();
  const remindersCollection = collection(db, "reminders");

  useEffect(() => {
    onSnapshot(remindersCollection, (snapshot) => {
      const remindersTemp = [];
      snapshot.forEach((doc) => {
        remindersTemp.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setReminders(remindersTemp);
    });
  }, []);

  const handleInputChange = (event) => {
    setReminder({ ...reminder, [event.target.name]: event.target.value });
  };

  const addReminder = () => {
    if (
      reminder.name.trim() !== "" &&
      reminder.date.trim() !== "" &&
      reminder.time.trim() !== ""
    ) {
      addDoc(remindersCollection, reminder);
    }
  };

  const deleteReminder = (id) => {
    const reminderRef = doc(db, "reminders", id);
    deleteDoc(reminderRef);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="Logout" onClick={handleLogout}>
        Logout
      </button>
      <div className="reminder-container">
        <div className="innerBox">
          <h1 className="reminder-title">Reminders</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Enter a reminder name"
              name="name"
              value={reminder.name}
              onChange={handleInputChange}
              className="reminder-input"
            />
            <input
              type="date"
              placeholder="Enter a reminder date"
              name="date"
              value={reminder.date}
              onChange={handleInputChange}
              className="reminder-input"
            />
            <input
              type="time"
              placeholder="Enter a reminder time"
              name="time"
              value={reminder.time}
              onChange={handleInputChange}
              className="reminder-input"
            />
            <button onClick={addReminder} className="reminder-button">
              Add
            </button>
          </form>
          <ul className="reminder-list">
            {reminders.map((reminder) => (
              <li key={reminder.id} className="reminder-item">
                <div className="reminder-info">
                  <div className="reminder-name">Reminder:{reminder.name}</div>
                  <div className="reminder-date">Date: {reminder.date}</div>
                  <div className="reminder-time">Time: {reminder.time}</div>
                </div>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="reminder-delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
