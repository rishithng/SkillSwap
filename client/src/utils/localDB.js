export const getSkills = () => {
  return JSON.parse(localStorage.getItem('skills') || '[]');
};

export const addSkill = (skill) => {
  const skills = getSkills();
  skills.push(skill);
  localStorage.setItem('skills', JSON.stringify(skills));
};
