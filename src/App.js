import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import Tour from "./Tour";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  function deleteTour(id) {
    setTours((prevTour) => {
      return prevTour.filter((tours) => {
        return tours.id != id;
      });
    });
  }
  async function getData() {
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <main>
      <Tours />
      {tours.map((tours) => {
        return (
          <Tour
            key={tours.id}
            id={tours.id}
            name={tours.name}
            info={tours.info}
            price={tours.price}
            image={tours.image}
            onDeleted={deleteTour}
          />
        );
      })}
    </main>
  );
}

export default App;
