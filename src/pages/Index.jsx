import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Index() {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen" style={{backgroundImage: `url(https://picsum.photos/2000)`}}>
                <div className="hero-content flex-col max-w-full">
                    <div className="card bg-base-100 w-full max-w-md md:max-w-md lg:max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="flex flex-col text-center mx-auto mb-6">
                                <div className="mx-auto">
                                    <RiAccountPinCircleFill fill="#0EA5E9" size="8em" />
                                </div>
                                <div className="text-3xl font-bold">
                                    Welcome
                                </div>
                            </div>
                            <div className="form-control gap-3">
                                <Link to="/signup" className="btn btn-md btn-info text-white font-bold">Create an account</Link>
                                <Link to="/login" className="btn font-bold text-gray-600">Login</Link>
                            </div>
                            <hr className="mt-10"/>
                            <p className="text-xs text-gray-600 text-center">Copyright © {new Date().getFullYear()} - All right reserved by Watcharapong</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
