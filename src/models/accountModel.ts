import bcrypt from "bcrypt";
import pool from "../database/pool";

interface AccountDetails {
  id?: number;
  username: string;
  password?: string;
  name: string;
  organization_id?: number;
}

interface FullAccountDetails extends AccountDetails {
  organization_name?: string;
}

const addAccount = async (account: AccountDetails) => {
  const password = await bcrypt.hash(account.password ?? "", 10);
  await pool.query(
    "INSERT INTO account (username, password, name, organization_id) VALUES ($1, $2, $3, $4)",
    [account.username, password, account.name, account.organization_id]
  );
};

const getAccount = async (username: string): Promise<AccountDetails | null> => {
  const { rows } = await pool.query(
    "SELECT * FROM account WHERE username = $1",
    [username]
  );
  return rows[0] as AccountDetails;
};

const getAccountById = async (id: number): Promise<FullAccountDetails> => {
  const { rows } = await pool.query(
    "SELECT a.*, o.name as organization_name FROM account a LEFT JOIN organization o ON o.id = a.organization_id WHERE a.id = $1",
    [id]
  );
  const details = rows[0] as FullAccountDetails;
  delete details.password;
  return details;
};

export {
  addAccount,
  getAccount,
  getAccountById,
  AccountDetails,
  FullAccountDetails
};
