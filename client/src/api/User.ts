import {z} from "zod"
import { validateResponse } from "./validateResponse";

export const UserSchema = z.object({
    id: z.string(),
    email: z.string(), 
    username: z.string()
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function registerUser(email: string, username: string, password: string): Promise<void> {
    return fetch("api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, username, password}),
    }).then(validateResponse)
    .then(() => undefined);
} 

export function login(email: string, password: string): Promise<void> {
    return fetch("api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}), 
    }).then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<User> {
    return fetch("api/users/me")
    .then(validateResponse)
    .then(response => response.json())
    .then(data => UserSchema.parse(data));
}

export function logoutUser(): Promise<void> {
    return fetch("api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => undefined);
}