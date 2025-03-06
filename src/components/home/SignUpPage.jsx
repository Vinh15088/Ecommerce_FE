import SignUp from "../auth/sign-up/SignUp";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";

function SignUpPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <SignUp />
            </div>
            <Footer />
        </div>
    )
}

export default SignUpPage;