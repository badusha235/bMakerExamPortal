const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/categories/`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchExams(search?: string) {
  const url = search 
    ? `${API_BASE_URL}/exams/?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/exams/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exams');
  return res.json();
}

export async function fetchNotifications() {
  const res = await fetch(`${API_BASE_URL}/notifications/`);
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function fetchStudyMaterials() {
  const res = await fetch(`${API_BASE_URL}/study-materials/`);
  if (!res.ok) throw new Error('Failed to fetch study materials');
  return res.json();
}
