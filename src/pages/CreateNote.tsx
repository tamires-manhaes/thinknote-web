import { useNavigate } from "react-router";

import { MoveLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import type { AxiosError } from "axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        description,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as AxiosError).response?.status === 429
      ) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start p-4 mt-4 max-w-md mx-auto">
      <div className="mb-4 w-full flex flex-row justify-between items-center">
        <button
          className="btn btn-ghost btn-primary btn-sm"
          onClick={() => navigate("/")}
        >
          <MoveLeft className="mr-2 size-4 transition-all" />
          Back to notes
        </button>
      </div>
      <div className="card w-full max-w-md">
        <form className="bg-primary-content  p-6 rounded-md">
          <h2 className="font-bold text-xl">Create a new Note</h2>
          <div>
            <label className="label font-semibold text-sm">Title</label>
            <input
              type="text"
              placeholder="Note title"
              className="input input-bordered w-full text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="label font-semibold">Description</label>
            <textarea
              className="textarea textarea-bordered w-full "
              placeholder="Write your note here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="btn btn-primary btn-wide"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
