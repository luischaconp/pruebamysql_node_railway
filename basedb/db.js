import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } from "../config/config.js";

export const pool= createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT
})