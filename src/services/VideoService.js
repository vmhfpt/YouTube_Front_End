export async function getAll() {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/videos/all`
  );
  const result = await response.json();
  return result;
}
export async function updateView() {}
