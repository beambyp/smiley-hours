import { Pool } from '@neondatabase/serverless'
import {
    UserAccount,
} from './definitions';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connected successfully");
        client.release(); // Release the client back to the pool after using it
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

export async function UserSignupFunction({ email, name, surname, gender, dateofbirth, phonenumber,password }: { email: string; name: string; surname: string; gender: string; dateofbirth: Date; phonenumber: string; password: string }) {
    const insert_useracccount = `
      INSERT INTO useraccount (email, password, role, isapprove)
      VALUES ($1, $2, $3, $4)
      RETURNING email, password, role, isapprove
    `;
    const values = [email, password, "User",true];
    
    const insert_userinfo = `
      INSERT INTO userinfo (email, name, surname, gender, dateofbirth, phonenumber)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING email, name, surname, gender, dateofbirth, phonenumber
    `;
    const values1 = [email, name, surname, gender, dateofbirth, phonenumber];

    try {
      const res = await pool.query(insert_useracccount, values);
      await pool.query(insert_userinfo, values1);
      return res.rows[0];
    } catch (error) {
      console.error("Error saving user to database:", error);
      throw new Error("Failed to save user");
    }
    finally {
        await pool.end(); 
    }
}

export async function Login(): Promise<UserAccount[]> {
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