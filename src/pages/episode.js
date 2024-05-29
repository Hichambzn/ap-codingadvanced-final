import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

function Episode() {
  const [episodeData, setEpisodeData] = useState(null);
  const [episodeId, setEpisodeId] = useState("");
  const router = useRouter();
  const { episode } = router.query;

  useEffect(() => {
    if (episode) {
      fetchEpisode(episode);
    }
  }, [episode]);

  const fetchEpisode = async (id) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      setEpisodeData(response.data);
    } catch (error) {
      console.error("Error fetching episode:", error);
    }
  };

  const handleInputChange = (e) => {
    setEpisodeId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (episodeId) {
      fetchEpisode(episodeId);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="/ ">
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
              <Link href=" / " legacyBehavior>
                <a className="nav-link">Characters</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/location" legacyBehavior>
                <a className="nav-link">Location</a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link href="/episode" legacyBehavior>
                <a className="nav-link">
                  Episode <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main" className="container">
        <div className="jumbotron">
          <h1>Episode</h1>
          <p className="lead">
            This page will show you more information on episodes
          </p>
        </div>
      </main>

      <div className="container">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="episodeid">Episode ID:&nbsp;</label>
            <input
              type="number"
              className="form-control"
              id="episodeid"
              placeholder="ID"
              min="1"
              max="31"
              value={episodeId}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Get Episode Information
          </button>
        </form>
      </div>

      <div className="container">
        {episodeData && (
          <div className="row" id="episode">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{episodeData.name}</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <i className="fas fa-list-ol"></i>&nbsp;
                      {episodeData.episode}
                    </div>
                    <div className="col-md-6">
                      <i className="fas fa-broadcast-tower"></i>&nbsp;
                      {episodeData.air_date}
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

export default Episode;
