import knex from "knex";

let db;

export const initializeDatabaseMySQL = async () => {
  try {
    db = knex({
      client: "mysql2",
      connection: {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || 5222,
        user: process.env.MYSQL_USER || "turla_user",
        password: process.env.MYSQL_PASSWORD || "Turla2024!",
        database: process.env.MYSQL_DATABASE || "turla_db",
        charset: "utf8mb4",
      },
      pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 60000,
        idleTimeoutMillis: 600000,
      },
    });

    // Bağlantıyı test et
    await db.raw("SELECT 1");
    console.log("MySQL (Knex) veritabanına başarıyla bağlandı");
  } catch (error) {
    console.error("MySQL (Knex) bağlantı hatası:", error.message);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("MySQL (Knex) bağlantısı henüz kurulmadı");
  }
  return db;
};

export const closeConnection = async () => {
  if (db) {
    await db.destroy();
    console.log("MySQL (Knex) bağlantısı kapatıldı");
  }
};
