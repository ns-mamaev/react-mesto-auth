const BASE_URL = 'https://auth.nomoreparties.co';

const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.ok) {
    const { token } = await res.json();
    localStorage.setItem('token', token);
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};

export { register, login };
