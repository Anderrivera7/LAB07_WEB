const token = sessionStorage.getItem('token');

if (!token) {
  window.location.href = '/signin';
}

function logout() {
  sessionStorage.removeItem('token');
  window.location.href = '/signin';
}

function calculateAge(dateString) {
  const today = new Date();
  const birth = new Date(dateString);

  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

async function loadProfile() {
  try {
    const res = await fetch('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      sessionStorage.removeItem('token');
      return window.location.href = '/signin';
    }

    const user = await res.json();

    document.getElementById('name').value = user.name ?? '';
    document.getElementById('lastName').value = user.lastName ?? '';
    document.getElementById('email').value = user.email ?? '';
    document.getElementById('phoneNumber').value = user.phoneNumber ?? '';
    document.getElementById('birthdate').value = user.birthdate ? user.birthdate.split('T')[0] : '';
    document.getElementById('age').value = user.birthdate ? calculateAge(user.birthdate) : '';
    document.getElementById('address').value = user.address ?? '';
    document.getElementById('url_profile').value = user.url_profile ?? '';
    document.getElementById('roles').value = Array.isArray(user.roles)
      ? user.roles.map(r => r.name ?? r).join(', ')
      : '';

    const dashboardLink = document.getElementById('dashboardLink');

    const roleNames = Array.isArray(user.roles)
      ? user.roles.map(r => r.name ?? r)
      : [];

    dashboardLink.href = roleNames.includes('admin')
      ? '/dashboard-admin'
      : '/dashboard-user';

    M.updateTextFields();
  } catch (error) {
    alert('Error al cargar perfil');
  }
}

document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById('name').value,
    lastName: document.getElementById('lastName').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    birthdate: document.getElementById('birthdate').value,
    address: document.getElementById('address').value,
    url_profile: document.getElementById('url_profile').value
  };

  try {
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 401) {
      sessionStorage.removeItem('token');
      return window.location.href = '/signin';
    }

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || 'Error al actualizar perfil');
      return;
    }

    alert('Perfil actualizado correctamente');
    loadProfile();
  } catch (error) {
    alert('Error al actualizar perfil');
  }
});

loadProfile();