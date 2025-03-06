

function Footer() {
    return (
        <footer className=" bottom-0 w-full flex justify-center items-center px-5 h-20 bg-slate-100 flex-shrink-0 mt-auto shadow-black border-t border-gray-300">
            <span className="text-gray-700 text-opacity-70">
                Copyright © Website {new Date().getFullYear()}
            </span>
        </footer>
    );
}

export default Footer;