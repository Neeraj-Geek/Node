const USERS_DB_PATH = "./db/user.json";
import fs from "fs/promises";

const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_DB_PATH, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      // If file does not exist, return an empty array
      return [];
    }
    throw error;
  }
};

export default readUsers;
