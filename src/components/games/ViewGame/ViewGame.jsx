import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { GameService } from "../../../services/GameServices";
import Spinner from "../../Spinner/Spinner";

const ViewGame = () => {

    let { gameId } = useParams();
     let [state, setState] = useState({
       loading: false,
       games: [],
       errorMessage: "",
     });
    
  useEffect(() => {
    const a = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await GameService.getGame(gameId);
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
  }, [gameId]);

 let { loading, games } = state;

    return (
      <Fragment>
        <section className="movie-search p-3">
          <div className="container">
            <div className="grid">
              <div className="row">
                <div className="col">
                  <p className="h3 text-light">View Game</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {Object.keys(games).length > 0 && (
              <section className="view-game mt-3">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-2">
                      <img
                        src={games.photo}
                        alt=""
                        className="img-fluid game-img"
                      />
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                          Title: <span className="fw-bold">{games.title}</span>
                        </li>
                        <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                          Gender:{" "}
                          <span className="fw-bold">{games.gender}</span>
                        </li>
                        <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                          Developer:{" "}
                          <span className="fw-bold">{games.developer}</span>
                        </li>
                        <li className="list-group-item list-group-item-action text-bg-dark border border-white border-opacity-10 rounded">
                          Editor:{" "}
                          <span className="fw-bold">{games.editor}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col my-2">
                      <Link to={"/games/list"} className="btn btn-warning">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Fragment>
        )}
      </Fragment>
    );
};

export default ViewGame;