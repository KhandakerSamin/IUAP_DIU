import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reg_id TEXT UNIQUE NOT NULL,
  title TEXT,
  other_title TEXT,
  given_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  gender TEXT,
  passport_no TEXT,
  nationality TEXT,
  date_of_birth TEXT,
  organization TEXT,
  position TEXT,
  department TEXT,
  address TEXT,
  zip_code TEXT,
  city TEXT,
  country TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT NOT NULL,
  alternative_email TEXT,
  tshirt_size TEXT,
  food_requirement TEXT,
  other_food TEXT,
  is_member_university TEXT,
  has_family_members TEXT,
  family_members_count TEXT,
  family_members_other TEXT,
  needs_invitation_letter TEXT,
  payment_method TEXT,
  profile_photo_path TEXT,
  passport_scan_path TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_reff_id TEXT,
  payment_tran_id TEXT,
  payment_amount TEXT,
  payment_currency TEXT,
  invoice_path TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_reff_id ON registrations(payment_reff_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(payment_status);

CREATE TABLE IF NOT EXISTS family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  registration_id INTEGER NOT NULL,
  full_name TEXT,
  relationship TEXT,
  profile_photo_path TEXT,
  passport_scan_path TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_family_members_reg ON family_members(registration_id);
`;

const MIGRATIONS = [
  `ALTER TABLE registrations ADD COLUMN invoice_sent_at TEXT`,
  `ALTER TABLE registrations ADD COLUMN registration_period TEXT`,
];

function applyMigrations(db) {
  for (const sql of MIGRATIONS) {
    try {
      db.exec(sql);
    } catch (err) {
      const msg = String(err?.message || "");
      // Ignore "duplicate column" errors on re-runs.
      if (!msg.includes("duplicate column") && !msg.includes("already exists")) {
        console.warn("[db] migration skipped:", msg);
      }
    }
  }
}

function resolveDataDir() {
  const configured = process.env.IAUP_DATA_DIR || "./data";
  return path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function openDatabase() {
  const dataDir = resolveDataDir();
  ensureDir(dataDir);
  const dbPath = path.join(dataDir, "iaup.db");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA);
  applyMigrations(db);
  return db;
}

function getDatabase() {
  const g = globalThis;
  if (!g.__iaupDb) {
    g.__iaupDb = openDatabase();
  }
  return g.__iaupDb;
}

export function dataDir() {
  const dir = resolveDataDir();
  ensureDir(dir);
  return dir;
}

export function insertRegistration(row) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO registrations (
      reg_id, title, other_title, given_name, surname, gender, passport_no, nationality,
      date_of_birth, organization, position, department, address, zip_code, city, country,
      phone, whatsapp, email, alternative_email, tshirt_size, food_requirement, other_food,
      is_member_university, has_family_members, family_members_count, family_members_other,
      needs_invitation_letter, payment_method, profile_photo_path, passport_scan_path
    ) VALUES (
      @reg_id, @title, @other_title, @given_name, @surname, @gender, @passport_no, @nationality,
      @date_of_birth, @organization, @position, @department, @address, @zip_code, @city, @country,
      @phone, @whatsapp, @email, @alternative_email, @tshirt_size, @food_requirement, @other_food,
      @is_member_university, @has_family_members, @family_members_count, @family_members_other,
      @needs_invitation_letter, @payment_method, @profile_photo_path, @passport_scan_path
    )
  `);
  const result = stmt.run(row);
  return result.lastInsertRowid;
}

export function insertFamilyMember(row) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO family_members (registration_id, full_name, relationship, profile_photo_path, passport_scan_path)
    VALUES (@registration_id, @full_name, @relationship, @profile_photo_path, @passport_scan_path)
  `);
  return stmt.run(row).lastInsertRowid;
}

export function getRegistrationByRegId(regId) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM registrations WHERE reg_id = ?").get(regId);
}

export function getRegistrationByReffId(reffId) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM registrations WHERE payment_reff_id = ?").get(reffId);
}

export function getFamilyMembersForRegistration(registrationId) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM family_members WHERE registration_id = ? ORDER BY id").all(registrationId);
}

export function attachReffIdToRegistration(regId, reffId, amount, currency, period) {
  const db = getDatabase();
  return db
    .prepare(
      `UPDATE registrations
         SET payment_reff_id = ?,
             payment_amount = ?,
             payment_currency = ?,
             registration_period = COALESCE(?, registration_period),
             updated_at = datetime('now')
       WHERE reg_id = ?`
    )
    .run(reffId, amount, currency, period || null, regId);
}

export function markPaymentStatus(reffId, status, extras = {}) {
  const db = getDatabase();
  return db
    .prepare(
      `UPDATE registrations
         SET payment_status = ?,
             payment_tran_id = COALESCE(?, payment_tran_id),
             invoice_path = COALESCE(?, invoice_path),
             updated_at = datetime('now')
       WHERE payment_reff_id = ?`
    )
    .run(status, extras.tran_id || null, extras.invoice_path || null, reffId);
}

export function setInvoicePath(reffId, invoicePath) {
  const db = getDatabase();
  return db
    .prepare(
      `UPDATE registrations
         SET invoice_path = ?, updated_at = datetime('now')
       WHERE payment_reff_id = ?`
    )
    .run(invoicePath, reffId);
}

export function markInvoiceSent(reffId) {
  const db = getDatabase();
  return db
    .prepare(
      `UPDATE registrations
         SET invoice_sent_at = datetime('now'), updated_at = datetime('now')
       WHERE payment_reff_id = ?`
    )
    .run(reffId);
}

export function listRegistrations({ limit = 200, offset = 0, status, search } = {}) {
  const db = getDatabase();
  const where = [];
  const params = [];

  if (status && ["pending", "paid", "failed"].includes(status)) {
    where.push("payment_status = ?");
    params.push(status);
  }

  const q = typeof search === "string" ? search.trim() : "";
  if (q) {
    where.push(
      "(given_name LIKE ? OR surname LIKE ? OR email LIKE ? OR phone LIKE ? OR reg_id LIKE ?)"
    );
    const like = `%${q}%`;
    params.push(like, like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const sql = `SELECT * FROM registrations ${whereSql} ORDER BY id DESC LIMIT ? OFFSET ?`;
  return db.prepare(sql).all(...params, limit, offset);
}

export function countRegistrationsByStatus() {
  const db = getDatabase();
  const rows = db
    .prepare(
      "SELECT payment_status AS status, COUNT(*) AS n FROM registrations GROUP BY payment_status"
    )
    .all();
  const out = { all: 0, pending: 0, paid: 0, failed: 0 };
  for (const r of rows) {
    out.all += r.n;
    if (r.status in out) out[r.status] = r.n;
  }
  return out;
}

export function runInTransaction(fn) {
  const db = getDatabase();
  return db.transaction(fn)();
}
