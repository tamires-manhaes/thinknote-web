import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <div data-theme="night" className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
}

export default App;
