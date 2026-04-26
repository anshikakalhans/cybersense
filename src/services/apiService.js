const ABUSEIPDB_KEY = import.meta.env.VITE_ABUSEIPDB_KEY

export const checkIP = async (ip) => {
  const response = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
    {
      headers: {
        'Key': ABUSEIPDB_KEY,
        'Accept': 'application/json',
      },
    }
  )
  const data = await response.json()
  return data
}