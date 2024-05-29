import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      console.log("API response:", response.data); // Debug log
      setCharacters(response.data.results);
      setInfo(response.data.info);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const getIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div>
      <main role="main" className="container">
        <div className="jumbotron">
          <h1>Characters</h1>
          <p className="lead">
            This page will show you the characters in this series.
          </p>
        </div>
      </main>

      <div className="container">
        <div className="row">
          {characters.map((char, index) => (
            <div className="col-md-4" key={char.id}>
              <div className="card mb-4">
                <img
                  className="card-img-top"
                  src={char.image}
                  alt={char.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{char.name}</h5>
                  <div className="row">
                    <div className="col">
                      <i className="fas fa-transgender"></i>&nbsp;{char.gender}
                    </div>
                    <div className="col">
                      <i className="fas fa-stethoscope"></i>&nbsp;{char.status}
                    </div>
                    <div className="col">
                      <i className="fas fa-space-shuttle"></i>&nbsp;
                      {char.species}
                    </div>
                  </div>
                  <ul className="list-group mt-3">
                    <li className="list-group-item list-group-item-info">
                      <Link
                        href={`/location?location=${getIdFromUrl(
                          char.location.url
                        )}`}
                        legacyBehavior
                      >
                        <a>
                          <i className="fas fa-globe"></i>&nbsp;
                          {char.location.name}
                        </a>
                      </Link>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse${index}`}
                    >
                      Episodes
                      <span className="badge badge-primary badge-pill">
                        {char.episode.length}
                      </span>
                    </li>
                    <div className="collapse" id={`collapse${index}`}>
                      <div className="card card-body">
                        <ul className="list-group list-group-flush">
                          {char.episode.map((ep, idx) => (
                            <li className="list-group-item" key={idx}>
                              <Link
                                href={`/episode?episode=${getIdFromUrl(ep)}`}
                                legacyBehavior
                              >
                                <a>{getIdFromUrl(ep)}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${info.prev ? "" : "disabled"}`}>
              <button
                className="page-link"
                onClick={() => loadCharacters(getIdFromUrl(info.prev))}
              >
                &laquo;
              </button>
            </li>
            {[...Array(info.pages).keys()].map((page) => (
              <li
                className={`page-item ${
                  page + 1 ===
                  (info.next ? getIdFromUrl(info.next) - 1 : info.pages)
                    ? "active"
                    : ""
                }`}
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => loadCharacters(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${info.next ? "" : "disabled"}`}>
              <button
                className="page-link"
                onClick={() => loadCharacters(getIdFromUrl(info.next))}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default Characters;
