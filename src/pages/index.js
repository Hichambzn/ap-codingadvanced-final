import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  const loadCharacters = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = info.pages;
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (startPage === 1) {
      endPage = Math.min(5, totalPages);
    }
    if (endPage === totalPages) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li
              className={`page-item ${currentPage === page ? "active" : ""}`}
              key={page}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="#">
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
            <li className="nav-item active">
              <Link href="/" legacyBehavior>
                <a className="nav-link">
                  Characters <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/location" legacyBehavior>
                <a className="nav-link">Location</a>
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
                      aria-expanded="false"
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
        {renderPagination()}
      </footer>
    </div>
  );
}

export default Home;
