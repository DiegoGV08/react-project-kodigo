import { Fragment } from "react"
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to={'/'} className='navbar-brand'>
                        {/* <i className="fa fa-mobile text-warning"/> */}
                        🎮 Game <span className="text-warning">Manager</span></Link>
                </div>
            </nav>
        </Fragment>
    )
};

export default NavBar;