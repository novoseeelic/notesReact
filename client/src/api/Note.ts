import { z } from "zod";
import { validateResponse } from "./validateResponse";
import { queryClient } from "./queryClient";
import { useQuery } from "@tanstack/react-query";

export const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number(),
});

export type Note = z.infer<typeof NoteSchema>;

export const NoteList = z.array(NoteSchema);

export type NoteList = z.infer<typeof NoteList>;

export const FetchNoteListSchema = z.object({
    list: NoteList,
});

type FetchNoteListResponse = z.infer<typeof FetchNoteListSchema>;

export function fetchNoteList(url:string): Promise<FetchNoteListResponse> {
    return fetch(url).then((response) => response.json()).then((data) => FetchNoteListSchema.parse(data));
}

interface IdleRequesrState {
    status: "idle";
}

interface LoadingRequesrState {
    status: "pending";
}

interface SuccessRequesrState {
    status: "success";
    data: NoteList;
}

interface ErrorRequesrState {
    status: "error";
    error: unknown;
}

type RequesrState = 
| IdleRequesrState
| LoadingRequesrState
| SuccessRequesrState
| ErrorRequesrState; 

export function useNoteList(url: string, queryKey: string) {

  const notesQuery = useQuery(
    {
        queryFn: () => fetchNoteList(url),
        queryKey: [queryKey],
    }, 
    queryClient
  );
  
  const notes = notesQuery.data?.list;
  const status = notesQuery.status;
  const error = notesQuery.error;

  return { notes, status, error };
    
}

export function createNote(title: string, text: string): Promise<void> {
    return fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            text,
        }),
    }).then(validateResponse)
    .then(() => undefined);
}
