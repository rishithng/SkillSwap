import React, { useState, useEffect } from 'react';
import Login from './pages/Login.jsx';
import { getSkills, addSkill, removeSkill } from './utils/localDB.js';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setSkills(getSkills());
  }, []);

  const handleAddSkill = () => {
    const skill = {
      id: Date.now(),
      name: newSkill,
      user,
    };
    addSkill(skill);
    setSkills(getSkills());
    setNewSkill('');
  };

  const handleDeleteSkill = (id) => {
  removeSkill(id);           // remove from localStorage
  setSkills(getSkills());    // reload updated list
};

 return user ? (
  <div className="container">
    <h2>Welcome, {user}</h2>
    <button className="logout" onClick={handleLogout}>🚪 Logout</button>
      <input
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="Add a skill"
      />
      <button onClick={handleAddSkill}>Add Skill</button>
      <ul>
  {skills.map((s) => (
    <li key={s.id}>
      {editingId === s.id ? (
        <>
          <input
            className="editing-input"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={handleEditSave}>💾 Save</button>
        </>
      ) : (
        <>
          <span>{s.name} <small>(by {s.user})</small></span>
          <div>
            <button onClick={() => handleEditClick(s.id, s.name)}>✏️ Edit</button>
            <button onClick={() => handleDeleteSkill(s.id)}>🗑️ Delete</button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>
    </div>
  ) : (
    <Login onLogin={setUser} />
  );
}

export default App;
