import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LoaderIcon, MoveLeft, Trash2 } from "lucide-react";
import type { NoteCardProps } from "../components/NoteCard";
import api from "../api";
import toast from "react-hot-toast";

function NoteDetail() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState<NoteCardProps>({
    _id: "",
    title: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const res = (await api.get(`/${id}`)).data;
        setNote(res);
      } catch (err) {
        console.log("Error in fetching note", err);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSave = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

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

        <button className="btn btn-outlin  btn-sm" onClick={handleDelete}>
          <Trash2 className="bg-transparent text-red-400 size-4 mr-2" />
          Delete Note
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
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="label font-semibold">Description</label>
            <textarea
              placeholder="Write your note here...."
              className="textarea textarea-bordered w-full"
              value={note.description}
              onChange={(e) =>
                setNote({ ...note, description: e.target.value })
              }
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="btn btn-primary btn-wide"
              disabled={saving}
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteDetail;
