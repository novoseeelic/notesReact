import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { FC } from 'react';
import { useNoteList } from "../../api/Note";

export const FetchNoteListView: FC = () => { 

    const noteListQuery = useNoteList("api/notes", "notes");

    switch(noteListQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            return <NotesListView noteList={noteListQuery.notes}/>;

        case "error":
            return (
            <div>
                <span>Произошла ошибка:(</span>
            </div>
        );
    }

}