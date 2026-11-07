import { useState } from "react";
import AirportAutocomplete from "./components/AirportAutocomplete";

function App() {
  const [selectedAirport, setSelectedAirport] = useState(null);

  return (
    <main className="page">
      <section className="search-card">
        <h1>Find an Airport</h1>

        <p className="description"> Search Indian airports by city or IATA code.</p>

        <AirportAutocomplete onSelect={setSelectedAirport}/>

        {selectedAirport && (
          <div className="selected-panel">
            <strong>{selectedAirport.city} ({selectedAirport.code})</strong>
            <p>{selectedAirport.name}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;