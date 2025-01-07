import fs from "fs/promises";
const USERS_DB_PATH = "./db/user.json";

const writeUsers = async (users) => {
  try {
    await fs.writeFile(USERS_DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    throw error;
  }
};

export default writeUsers;
