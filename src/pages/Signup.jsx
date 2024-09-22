import SignUpForm from "../components/SignUpForm";

export default function Signup() {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen" style={{ backgroundImage: `url(https://picsum.photos/2000)` }}>
                <div className="hero-content flex-col max-w-full">
                    <div className="card bg-base-100 w-full max-w-md md:max-w-md lg:max-w-sm shrink-0 shadow-2xl">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
