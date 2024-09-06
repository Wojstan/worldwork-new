import { NextResponse, NextRequest } from "next/server";
import { SSLMode, connect } from 'ts-postgres';
import { sql, createClient } from '@vercel/postgres';


export async function POST(request: NextRequest) {
    // Do whatever you want
    console.log('running post')
    // const client = await connect({
    //     host: process.env.POSTGRES_HOST,
    //     port: 5432,
    //     database: process.env.POSTGRES_DATABASE,
    //     user: process.env.POSTGRES_USER,
    //     password: process.env.POSTGRES_PASSWORD,
    //     ssl: {
    //         mode: SSLMode.Require
    //     }
    // });
    // const asd = await client.query('INSERT INTO users (name, surname) VALUES ($1, $2)', ['John', 'Doe']);
    // console.log('asd', asd)

    const client = createClient({
      connectionString: process.env.POSTGRES_CONNECTION_STRING,
    });

    const asd = await client.query('INSERT INTO users (name, surname) VALUES ($1, $2)', ['John', 'Doe']);
    console.log('asd', asd)


    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}