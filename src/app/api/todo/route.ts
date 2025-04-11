import Database from "better-sqlite3"

const db = new Database('./sqlite.db')

export async function GET() {
    const users = db.prepare('SELECT * FROM user').all()
    console.log(users)
    return Response.json(users)
}