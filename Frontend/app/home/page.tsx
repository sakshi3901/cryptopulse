import HomePage from "@/Components/Pages/HomePage";
import Navbar from "@/Components/Elements/Navbar";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <div className="mb-10 w-full max-w-5xl">
                <Navbar />
            </div>
            <HomePage />
        </div>
    );
}
