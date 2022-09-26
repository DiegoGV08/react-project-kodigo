import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { GameService } from "../../../services/GameServices";
import Spinner from "../../Spinner/Spinner";

const GameList = () => {
  let [state, setState] = useState({
    loading: false,
    games: [],
    errorMessage: "",
  });

  useEffect(() => {
    const a = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await GameService.getAllGames();
        setState({
          ...state,
          loading: false,
          games: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    a();
  }, []);

let clickDelete = async (gameId) => {
  try {
    let response = await GameService.deleteGame(gameId);
    if (response) {
      setState({ ...state, loading: true });
      let response = await GameService.getAllGames();
      setState({
        ...state,
        loading: false,
        games: response.data
      });
    }
  } catch (error) {
    setState({
      ...state,
      loading: false,
      errorMessage: error.message,
    });
  }
};

  let { loading, games } = state;

  return (
    <Fragment>
      <section className="movie-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 text-light">
                  Game Manager
                  <Link to={"/games/add"} className="btn btn-success ms-3">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="movie-list">
            <div className="container">
              <div className="row">
                {games.length > 0 &&
                  games.map((games) => {
                    return (
                      <div className="col-md-6" key={games.id}>
                        <div className="card text-bg-dark my-3">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={games.photo}
                                  alt=""
                                  className="img-fluid game-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                                    Title:{" "}
                                    <span className="fw-bold">
                                      {games.title}{" "}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                                    Gender:{" "}
                                    <span className="fw-bold">
                                      {games.gender}{" "}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                                    Developer:{" "}
                                    <span className="fw-bold">
                                      {games.developer}{" "}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                                    Editor:{" "}
                                    <span className="fw-bold">
                                      {games.editor}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/games/view/${games.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/games/edit/${games.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => clickDelete(games.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default GameList;
