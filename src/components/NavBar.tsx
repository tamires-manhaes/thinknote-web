import { FilePlus } from "lucide-react";
import { Link, useNavigate } from "react-router";

function NavBar() {
  const navigate = useNavigate();
  return (
    <header className="bg-base-300 px-6 py-4 border-b border-base-200 ">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl text-secondary">ThinkNotes</h1>
          </Link>
        </div>
        <div>
          <button
            onClick={() => navigate("/create")}
            className="btn  btn-md mr-1 btn-secondary flex justify-center items-center"
          >
            <FilePlus />
            New note
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
