import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

function Location() {
  const [locationData, setLocationData] = useState(null);
  const [locationId, setLocationId] = useState("");
  const router = useRouter();
  const { location } = router.query;

  useEffect(() => {
    if (location) {
      fetchLocation(location);
    }
  }, [location]);

  const fetchLocation = async (id) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      setLocationData(response.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleInputChange = (e) => {
    setLocationId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationId) {
      fetchLocation(locationId);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href=" / ">
          Rick and Morty
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className="nav-link">Characters</a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link href="/location" legacyBehavior>
                <a className="nav-link">
                  Location <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/episode" legacyBehavior>
                <a className="nav-link">Episode</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main" className="container">
        <div className="jumbotron">
          <h1>Location</h1>
          <p className="lead">
            This page will show you more information on locations
          </p>
        </div>
      </main>

      <div className="container">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="locationid">Location ID:&nbsp;</label>
            <input
              type="number"
              className="form-control"
              id="locationid"
              placeholder="ID"
              min="1"
              max="76"
              value={locationId}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Get Location Information
          </button>
        </form>
      </div>

      <div className="container">
        {locationData && (
          <div className="row" id="location">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{locationData.name}</h5>
                  <div className="row">
                    <div className="col-md-6">
                      Type:&nbsp;{locationData.type}
                    </div>
                    <div className="col-md-6">
                      Dimension:&nbsp;{locationData.dimension}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Location;
