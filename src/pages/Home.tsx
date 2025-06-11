import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";
import api from "../api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import NoteCard, { type NoteCardProps } from "../components/NoteCard";
import type { AxiosError } from "axios";

function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState<NoteCardProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = (await api.get("/")).data;
        setNotes(res);
        setIsRateLimited(false);
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          (err as AxiosError).response?.status === 429
        ) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <NavBar />
      {isRateLimited && <RateLimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className=" text-lg text-center text-secondary py-10 font-semibold">
            <Loader className="mx-auto animate-spin w-8 h-8 mb-2" />
            <span>Loading...</span>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </ul>
        )}
      </div>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default Home;
