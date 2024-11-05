import Login from "../libs/data"; 
import { UserAccount } from "../libs/definitions"; 

export default async function Page() {
    const users: UserAccount[] = await Login();
    return (
        <div>
            <h1>User Accounts</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            <h2>Email: {user.email}</h2>
                            <p>Role: {user.role}</p>
                            <p>Is Approved: {user.isapprove ? 'Yes' : 'No'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p> 
            )}
        </div>
    );
}
