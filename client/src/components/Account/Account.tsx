import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/User"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";
import { queryClient } from "../../api/queryClient";
import { UserView } from "../UserView";
import { LogoutButton } from "../LogoutButton";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";
import {} from "./Account.css"

export const Account = () => {
    const meQuery = useQuery(
        {
            queryFn: () => fetchMe(),
            queryKey: ["users", "me"],
            retry: 0
        },
        queryClient
    );

    switch (meQuery.status) {
        case "pending":
            return <Loader />;

        case "error":
            return <AuthForm />;

        case "success":
            return (
                <div>
                    <div className="user-logout">
                        <UserView user={meQuery.data} />
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