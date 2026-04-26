export const checkIP = async (ip) => {
  const response = await fetch(`/api/check-ip?ip=${ip}`)
  const data = await response.json()
  return data
}