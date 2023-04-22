import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [reminder, setReminder] = useState({ name: '', date: '', time: '' });
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders'));
    if (storedReminders) {
      setReminders(storedReminders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleInputChange = (event) => {
    setReminder({ ...reminder, [event.target.name]: event.target.value });
  };

  const addReminder = () => {
    if (reminder.name.trim() !== '' && reminder.date.trim() !== '' && reminder.time.trim() !== '') {
      setReminders([...reminders, reminder]);
      setReminder({ name: '', date: '', time: '' });
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  return (
    <div className="reminder-container">
    <div className='innerBox'>

   
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
        {reminders.map((reminder, index) => (
          <li key={index} className="reminder-item">
            <div className="reminder-info">
              <div className="reminder-name">Reminder:{reminder.name}</div>
              <div className="reminder-date">Date: {reminder.date}</div>
              <div className="reminder-time">Time: {reminder.time}</div>
            </div>
            <button onClick={() => deleteReminder(index)} className="reminder-delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Dashboard;
