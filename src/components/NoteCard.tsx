import { PenSquareIcon, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../utils";

export interface NoteCardProps {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

function NoteCard({ note }: { note: NoteCardProps }) {
  const navigate = useNavigate();
  return (
    <li
      className="flex flex-col w-full bg-neutral p-4 rounded-lg"
      id={note._id}
    >
      <Link to={`/note/${note._id}`}>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-secondary">{note.title}</h3>
          <span className="line-clamp-3">{note.description}</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span>{formatDate(note.createdAt)}</span>

          <div className="flex flex-row justify-center items-center">
            <button className="btn btn-ghost btn-sm mr-1">
              <Trash2 className="bg-transparent text-red-400 size-4" />
            </button>
            <button
              onClick={() => navigate(`/note/${note._id}`)}
              className="btn btn-ghost btn-sm"
            >
              <PenSquareIcon className="text-gray-400 size-4" />
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default NoteCard;
