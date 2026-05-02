const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');

if (signInForm) {
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      sessionStorage.setItem('token', data.token);

      if (data.roles.includes('admin')) {
        window.location.href = '/dashboard-admin';
      } else {
        window.location.href = '/dashboard-user';
      }
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('name').value,
      lastName: document.getElementById('lastName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      birthdate: document.getElementById('birthdate').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    try {
      const res = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert('Usuario registrado correctamente');
      window.location.href = '/signin';
    } catch (error) {
      alert('Error al registrar usuario');
    }
  });
}