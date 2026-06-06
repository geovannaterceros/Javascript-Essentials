import axios from 'axios';

export async function renderProfile(container) {
  container.innerHTML = `
    <h3>Profile</h3>
    <section>
      <div id='name'></div>
      <div id='email'></div>
    </section>
  `;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  
  try{
    const response = await axios.get(`https://randomuser.me/api/`);
    name.textContent = response.data.results[0].name.first +" "+response.data.results[0].name.last;
    email.textContent = response.data.results[0].email;    
  } catch (error) {
        return 'Email unavailable';
  }
};