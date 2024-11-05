import { Pool } from '@neondatabase/serverless'
import {
    UserAccount
} from './definitions';

export default async function Login(): Promise<UserAccount[]> {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const result = await pool.query<UserAccount>('SELECT * FROM useraccount');
        return result.rows; 
    } catch (error) {
        console.error('Error executing query', error);
        return []; 
    } finally {
        await pool.end(); 
    }
}