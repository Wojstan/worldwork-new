'use server'
// import { sql, createClient } from '@vercel/postgres';
import { SSLMode, connect } from 'ts-postgres';


export async function addEmployer(formData: FormData) {
  console.log('addEmployer')
  try {
    // const client = createClient({
    //   connectionString: process.env.POSTGRES_CONNECTION_STRING,
    // });
    console.log('cliennt added. running query')
    // const asdf = await client.sql`INSERT INTO users (name, surname) VALUES ('John', 'Doe');`;
    // console.log(asdf)
    const client = await connect({
      host: process.env.POSTGRES_HOST,
      port: 5432,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: {
        mode: SSLMode.Require
      }
    });
    const asd = await client.query('INSERT INTO users (name, surname) VALUES ($1, $2)', ['John', 'Doe']);
    console.log('asd', asd)
  } catch (error) {
    console.log('error', error)
  }
  return ''
}
