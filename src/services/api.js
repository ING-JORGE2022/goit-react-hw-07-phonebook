const API = 'https://6489e1dc5fa58521cab06af0.mockapi.io/';

const POST = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const DELETE = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchContacts() {
  const response = await fetch(`${API}contacts`);
  return response.json();
}

export async function addContact(obj) {
  const response = await fetch(`${API}contacts`, POST(obj));
  return response.json();
}

export async function deleteContact(id) {
  const response = await fetch(`${API}contacts/${id}`, DELETE(id));
  return response.json();
}
