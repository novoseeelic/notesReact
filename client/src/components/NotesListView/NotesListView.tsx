import { FC } from 'react';
import { NoteList } from "../../api/Note"
import "./NotesListView.css";
import { NoteView } from "../NoteView";

export interface NoteListViewProps {
  noteList: NoteList;
}

export const NotesListView: FC<NoteListViewProps> = ({ noteList }) => {
  return (
    <ul className="note-list-view">
      {noteList.map((note) => (
        <li key={note.id} className="post-list__item">
          <NoteView note={note} />
        </li>
      ))}
      {/* <li>
        <NoteView />
      </li>
      <li>
        <NoteView />
      </li>
      <li>
        <NoteView />
      </li>
      <li>
        <NoteView />
      </li>
      <li>
        <NoteView />
      </li> */}
    </ul>
  );
};
