import readMessages from "../utils/readMessages.js";
import writeMessages from "../utils/writeMessages.js";

const getMessages = async (req, res) => {
  try {
    const messages = await readMessages();
    let message = messages.map((data) => {
      return `message:${data.message}  From:${data.username} To:${data.to}`;
    });
    res.json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching messages");
  }
};

const sendMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { username, to, message } = req.body;
    if (!username || !message) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
    const messages = await readMessages();
    if (messages) {
      let newMessage = {
        id: Date.now(),
        to,
        username,
        message,
        timestamp: currentDate.toLocaleString(),
      };
      messages.push(newMessage);
      await writeMessages(messages);
      res.json({ message: "Message sent successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while sending messages");
  }
};

export { getMessages, sendMessage };
