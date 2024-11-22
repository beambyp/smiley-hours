"use client"
import { useSession } from "next-auth/react";

export default function Page() {
    const {data: session,status} = useSession();
    console.log(session)
    console.log(status)
    return (
        status == "authenticated" && session.user &&
        (<div>
            <p>Welcome, {session.user.email}</p>
        </div>)
    );
}
