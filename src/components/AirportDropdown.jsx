

function AirportDropdown({airports, activeIndex, onAirportSelect}) {
  if (airports.length === 0) {

    return (
      <div className="dropdown empty-state">
        No matching airports found.
      </div>
    );

  }

  return (
    <ul className="dropdown results-list"  id="airport-results">
      {airports.map((airport, index) => (
        <li
          key={airport.code}
          aria-selected={activeIndex === index}
          className={`result-item ${
            activeIndex === index ? "active" : ""
          }`}
        
          onClick={() => onAirportSelect(airport)}>
            
          <div className="airport-code">
            {airport.code}
          </div>

          <div className="airport-details">
            <strong>{airport.city}</strong>
            <small>{airport.name}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AirportDropdown;