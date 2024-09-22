import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="container mx-auto h-full mt-10">
            <div className="text-center gap-6 flex flex-col">
                <h1 className="text-3xl font-bold">404 Page Not Found</h1>
                <div>
                    <Link to="/home" className="btn btn-primary">Go Home</Link>
                </div>
            </div>
        </div>
    )
}
