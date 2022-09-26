import { useEffect, Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GameService } from "../../../services/GameServices";

const EditGame = () => {
  let navigate = useNavigate();

  let { gameId } = useParams();

  let [state, setState] = useState({
    loading: false,
    games: {},
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

  let updateInput = (event) => {
    setState({
      ...state,
      games: {
        ...state.games,
        [event.target.name]: event.target.value,
      },
    });
  };

let submitForm = async (event) => {
  event.preventDefault();
  try {
    let response = await GameService.updateGame(state.games, gameId);
    if (response) {
      navigate("/games/list", { replace: true });
    }
  } catch (error) {
    setState({ ...state, errorMessage: error.message });
    navigate(`/games/edit/${gameId}`, { replace: false });
  }
};

  let { games} = state;

  return (
    <Fragment>
      <section>
        <div className="add-game p-4">
          <div className="container">
            <div className="row p-3">
              <div className="col">
                <p className="h3 text-light fw-bold">Edit Game</p>
              </div>
            </div>
            <div className="row align-items-center p-3">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2">
                    <input
                      required="true"
                      name="title"
                      value={games.title}
                      onChange={updateInput}
                      type="text"
                      className="form-control text-bg-dark border border-white border-opacity-10 rounded"
                      placeholder="Title"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required="true"
                      name="gender"
                      value={games.gender}
                      onChange={updateInput}
                      type="text"
                      className="form-control text-bg-dark border border-white border-opacity-10 rounded"
                      placeholder="Gender"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required="true"
                      name="developer"
                      value={games.developer}
                      onChange={updateInput}
                      type="text"
                      className="form-control text-bg-dark border border-white border-opacity-10 rounded"
                      placeholder="Developer"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required="true"
                      name="editor"
                      value={games.editor}
                      onChange={updateInput}
                      type="text"
                      className="form-control text-bg-dark border border-white border-opacity-10 rounded"
                      placeholder="Editor"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      required="true"
                      name="photo"
                      value={games.photo}
                      onChange={updateInput}
                      type="text"
                      className="form-control text-bg-dark border border-white border-opacity-10 rounded"
                      placeholder="Photo Url"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Update"
                    />
                    <Link to={"/games/list"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6 mb-5">
                <img src={games.photo} alt="" className="img-fluid game-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default EditGame;
