import yargs from "yargs/yargs";
import fs from "fs";
import { hideBin } from "yargs/helpers"; // Required for parsing `process.argv`
import chalk from "chalk";

const argv = yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Adds New document",
    builder: {
      title: {
        describe: "title",
        demandOption: true,
        type: "string",
      },
      description: {
        describe: "description",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      try {
        let newNote = {
          title: argv.title,
          description: argv.description,
        };
        const stats = fs.statSync("./notes.json");
        if (stats.size === 0) {
          const notes = [];
          notes.push(newNote);
          fs.writeFileSync("./notes.json", JSON.stringify(notes));
        } else {
          const notes = JSON.parse(fs.readFileSync("./notes.json"));
          let note = notes.find((note) => note.title === argv.title);
          if (note) {
            console.log(chalk.red("Note with this title already exists"));
            return;
          }
          notes.push(newNote);
          fs.writeFileSync("./notes.json", JSON.stringify(notes));
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .command({
    command: "list",
    describe: "Lists all notes",

    handler() {
      try {
        const stats = fs.statSync("./notes.json");
        if (stats.size === 0) {
          console.log("No notes yet");
          return;
        } else {
          const notes = JSON.parse(fs.readFileSync("./notes.json"));
          notes.forEach((note) => {
            let detailNote = `Note Title:- ${note.title}\nDescription:- ${note.description}\n`;
            console.log(chalk.green(detailNote));
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .command({
    command: "read",
    describe: "read document",
    builder: {
      title: {
        describe: "title",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      try {
        const stats = fs.statSync("./notes.json");
        if (stats.size === 0) {
          console.log("There is no note available");
        } else {
          const notes = JSON.parse(fs.readFileSync("./notes.json"));
          let note = notes.find((note) => note.title === argv.title);
          if (note) {
            console.log(chalk.green(note.description));
          } else {
            console.log(chalk.red("Note not found"));
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .command({
    command: "update",
    describe: "update New document",
    builder: {
      title: {
        describe: "title",
        demandOption: true,
        type: "string",
      },
      description: {
        describe: "description",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      try {
        let newNote = {
          title: argv.title,
          description: argv.description,
        };
        const stats = fs.statSync("./notes.json");
        if (stats.size === 0) {
          console.log(chalk.red("Note are empty"));
        } else {
          const notes = JSON.parse(fs.readFileSync("./notes.json"));
          let note = notes.find((note) => note.title === argv.title);
          if (!note) {
            console.log(chalk.red("Note doesn't exists"));
            return;
          }
          note.description = argv.description;

          fs.writeFileSync("./notes.json", JSON.stringify(notes));
          console.log(chalk.green("Note Updated"));
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .command({
    command: "delete",
    describe: "update New document",
    builder: {
      title: {
        describe: "title",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      try {
        const stats = fs.statSync("./notes.json");
        if (stats.size === 0) {
          console.log("Notes are empty");
        } else {
          const notes = JSON.parse(fs.readFileSync("./notes.json"));
          let noteIndex = notes.findIndex((note) => note.title === argv.title);
          if (noteIndex == -1) {
            console.log(chalk.red("Notes doesn't exists"));
            return;
          }
          notes.splice(noteIndex, 1);

          fs.writeFileSync("./notes.json", JSON.stringify(notes));
          console.log(chalk.green("Note Deleted"));
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .parse();
