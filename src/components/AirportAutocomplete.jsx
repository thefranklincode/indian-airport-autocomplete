import { useEffect, useRef, useState } from "react";
import { searchAirports } from "../utils/airportSearch";
import AirportDropdown from "./AirportDropdown";

const DEBOUNCE_DELAY = 350

function AirportAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const matches = searchAirports(query, 5)

      setResults(matches)
      setActiveIndex(-1)
      setIsOpen((query.trim()))
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer)
  }, [query]);


  function handleChange(event) {
    setQuery(event.target.value)
    setIsOpen(true)
  }

  function selectAirport(airport) {
    setQuery(`${airport.city} (${airport.code})`)
    setIsOpen(false)
    setActiveIndex(-1)

    onSelect?.(airport)
  }

  function clearSearch() {
    setQuery("")
    setResults([])
    setIsOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <label htmlFor="airport-search">
        Airport
      </label>

      <div className="input-wrap">
        <input
          ref={inputRef}
          id="airport-search"
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true)
            }
          }}
          placeholder="Search city or airport code..."
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="airport-results"
          aria-activedescendant={
            activeIndex >= 0
              ? `airport-option-${activeIndex}`
              : undefined
          }
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <AirportDropdown
          airports={results}
          activeIndex={activeIndex}
          onAirportSelect={selectAirport}
          onActiveIndexChange={setActiveIndex}
        />
      )}

      <p className="helper-text">
        Type a city or IATA code to see up to 5 results.
      </p>
    </div>
  );
}

export default AirportAutocomplete;