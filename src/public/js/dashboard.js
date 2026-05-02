const token = sessionStorage.getItem('token');

if (!token) {
  window.location.href = '/signin';
}

function logout() {
  sessionStorage.removeItem('token');
  window.location.href = '/signin';
}

async function loadUsers() {
  try {
    const res = await fetch('/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      sessionStorage.removeItem('token');
      return window.location.href = '/signin';
    }

    if (res.status === 403) {
      return window.location.href = '/403';
    }

    const users = await res.json();
    const tbody = document.querySelector('#usersTable tbody');

    tbody.innerHTML = '';

    users.forEach(user => {
      tbody.innerHTML += `
        <tr>
          <td>${user.name} ${user.lastName ?? ''}</td>
          <td>${user.email}</td>
          <td>${user.roles.map(r => r.name).join(', ')}</td>
        </tr>
      `;
    });
  } catch (error) {
    alert('Error al cargar usuarios');
  }
}

loadUsers();