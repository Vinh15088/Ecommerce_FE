import SignIn from "../auth/sign-in/SignIn";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";

function SignInPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <SignIn />
            </div>
            <Footer />
        </div>
    )
}

export default SignInPage;