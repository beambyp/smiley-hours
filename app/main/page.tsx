"use client"
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();
    console.log(session)
    console.log(status)

    async function fetchPsychologists() {
        try {
            const response = await fetch("/api/notification");
            const data = await response.json();
            console.log(data);
            }
        catch (error) {
            console.error("Error fetching psychologist data:", error);
        }
    }
    fetchPsychologists()
return (
    status == "authenticated" && session.user &&
    (<div>
        <p>Welcome, {session.user.email}</p>
    </div>)
);
}
