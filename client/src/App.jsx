import React, { useState, useEffect } from 'react';
import Login from './pages/Login.jsx';
import { getSkills, addSkill } from './utils/localDB.js';

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

  return user ? (
    <div>
      <h2>Welcome, {user}</h2>
      <input
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="Add a skill"
      />
      <button onClick={handleAddSkill}>Add Skill</button>
      <ul>
        {skills.map((s) => (
          <li key={s.id}>{s.name} (by {s.user})</li>
        ))}
      </ul>
    </div>
  ) : (
    <Login onLogin={setUser} />
  );
}

export default App;
