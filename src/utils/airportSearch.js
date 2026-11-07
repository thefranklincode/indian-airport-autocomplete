import airports from "../airports.json";

export function searchAirports(query, limit = 5) {
  const searchValue = query.trim().toLowerCase()

  if (!searchValue) {
    return []
  }

  const filteredAirports = airports.filter((airport) => {
    const codeMatch = airport.code
      .toLowerCase()
      .includes(searchValue)

    const cityMatch = airport.city
      .toLowerCase()
      .includes(searchValue)

    return codeMatch || cityMatch
  })

  return filteredAirports.slice(0, limit)
}