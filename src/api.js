// ✅ Fixed local-only API setup
// Frontend: http://localhost:3000
// Backend:  http://localhost:4000

export const API_URL = process.env.REACT_APP_API_URL ;

// Optional: check URL in browser console
console.log("✅ Using local API:", API_URL);

// ---- API functions ----

export async function fetchFeedbacks() {
  const res = await fetch(`${API_URL}/feedbacks`);
  if (!res.ok) throw new Error('Failed to fetch feedbacks');
  return res.json();
}

export async function createFeedback(data) {
  const res = await fetch(`${API_URL}/feedbacks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create feedback');
  return res.json();
}

export async function voteFeedback(id, delta) {
  const res = await fetch(`${API_URL}/feedbacks/${id}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ delta }),
  });
  if (!res.ok) throw new Error('Failed to vote');
  return res.json();
}

export async function updateFeedback(id, data) {
  const res = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update feedback');
  return res.json();
}

export async function deleteFeedback(id) {
  const res = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok && res.status !== 204) throw new Error('Failed to delete feedback');
}
