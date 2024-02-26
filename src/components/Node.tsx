import React, { useEffect, useRef, useState } from "react";
import "./index.css";

type Note = {
  name: string;
  status: string;
};

const initialNote: Note = { name: "", status: "" };

function NoteComponent() {
  const [tab, setTab] = useState("all");
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(initialNote);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const filterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    filterNotes();
    filterRef.current?.focus();
  }, [notes, tab]);

  function addNote(): void {
    setNotes([...notes, newNote]);
    setNewNote(initialNote);
  }

  function filterNotes(): void {
    switch (tab) {
      case "all":
        setFilteredNotes(notes);
        break;
      case "active":
        setFilteredNotes(notes.filter((note) => note.status === "Active"));
        break;
      case "completed":
        setFilteredNotes(notes.filter((note) => note.status === "Completed"));
        break;
      default:
        setFilteredNotes([]);
    }
  }
  console.log(filteredNotes);
  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input
          ref={filterRef}
          data-testid="input-note-name"
          type="text"
          className="large mx-8"
          placeholder="Note Title"
          value={newNote.name}
          onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
        />
        <input
          data-testid="input-note-status"
          type="text"
          className="large mx-8"
          placeholder="Note Status"
          value={newNote.status}
          onChange={(e) => setNewNote({ ...newNote, status: e.target.value })}
        />
        <button data-testid="submit-button" onClick={addNote}>
          Add Note
        </button>
      </section>
      <div className="mt-50">
        <ul className="tabs">
          {["all", "active", "completed"].map((filter) => (
            <li
              key={filter}
              className={`tab-item slide-up-fade-in ${tab === filter ? "active" : ""}`}
              data-testid={`${filter}Button`}
              onClick={() => setTab(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {filteredNotes.map(({ name, status }, index) => (
              <tr key={index}>
                <td className="pr-20">{name}</td>
                <td className="pl-20">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoteComponent;
