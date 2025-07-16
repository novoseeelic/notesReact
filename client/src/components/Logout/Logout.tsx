import { useQuery } from "@tanstack/react-query";
import { logoutUser } from "../../api/User";
import { AuthForm } from "../AuthForm";
import { Loader } from "../Loader";
import { queryClient } from "../../api/queryClient";
import { UserView } from "../UserView";
import { LogoutButton } from "../LogoutButton";
import { NoteForm } from "../NoteForm";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";

export const Logout = () => {
    const meQuery = useQuery(
        {
            queryFn: () => logoutUser(),
            queryKey: [],
        },
        queryClient
    );

    switch (meQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            return <AuthForm />;

        case "error":
            return (
                <div>
                    <div>
                        <UserView />
                        <LogoutButton />
                    </div>
                    <div className="form__note">
                        <NoteForm />
                        <FetchNoteListView />
                    </div>
                </div>
            );
    }
};