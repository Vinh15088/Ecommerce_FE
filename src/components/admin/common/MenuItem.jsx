import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MenuItem(props) {
    const activeClass = props.active
    ? "lg:rounded-md text-white bg-gray-900"
    : "text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700";


    return (
        <Link
            to={props.to}
            replace
            onClick={props.onClick}
            className={"lg:mx-4 py-8 lg:py-4 lg:px-3 flex justify-start md:justify-start lg:justify-start space-x-4 items-center truncate " + activeClass}
        >
            {props.children}
            <span className="lg:inline text-xl">{props.title}</span>
        </Link>
    );
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
}

export default MenuItem;

