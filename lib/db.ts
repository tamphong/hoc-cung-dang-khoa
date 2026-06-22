import { PrismaClient } from "./generated/prisma/client";

function createPrismaClient() {
  const url = process.env.DATABASE_URL || "";

  // Local SQLite (dev): file:./prisma/dev.db
  if (url.startsWith("file:") || url === "") {
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
    const path = require("path");
    const dbPath = url.startsWith("file:")
      ? url.replace("file:", "")
      : require("path").resolve(process.cwd(), "prisma", "dev.db");
    const absPath = require("path").resolve(process.cwd(), dbPath.replace(/^\.\//, ""));
    const adapter = new PrismaBetterSqlite3({ url: `file:${absPath}` });
    return new PrismaClient({ adapter } as never);
  }

  // Turso / libsql (production): libsql://...
  const { PrismaLibSql } = require("@prisma/adapter-libsql");
  const adapter = new PrismaLibSql({
    url: url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return new PrismaClient({ adapter } as never);
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
