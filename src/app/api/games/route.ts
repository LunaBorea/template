import Database from "better-sqlite3"
import { NextRequest } from "next/server";

const db = new Database("./games.db")

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const genre = searchParams.get("genre")
  const publisher = searchParams.get("publisher")

  let query = "SELECT * FROM games"
  const conditions: string[] = []
  const values: any[] = []

  if (genre) {
    conditions.push("genre LIKE ?")
    values.push(`%${genre}%`)
  }

  if (publisher) {
    conditions.push("publisher LIKE ?")
    values.push(`%${publisher}%`)
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ")
  }

  const games = db.prepare(query).all(...values)
  return Response.json(games)
}
