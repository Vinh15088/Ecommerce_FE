import PropTypes from "prop-types";

function Header(props) {
    const headerHeight = '72px';

    return (
        <div 
            className="flex lg:space-x-3 justify-center lg:justify-start lg:px-3 border-b border-gray-900 items-center"
            style={{height: headerHeight}}
        >            
            <h2 className="text-white text-2xl font-semibold lg:inline">
                {props.title}
            </h2>

                
        </div>
    );

}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

Header.Header = Header;

export default Header;