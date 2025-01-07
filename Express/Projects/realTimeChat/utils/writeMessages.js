import fs from "fs/promises";
const USERS_DB_PATH = "./db/messages.json";

const writeMessages = async (users) => {
  try {
    await fs.writeFile(USERS_DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    throw error;
  }
};

export default writeMessages;
