import greet from "./using_import/greet";
const userList = require("./username");

Object.values(userList).forEach((value) => {
  greet(value);
});

// Object.keys(userList).forEach((key) => {
//   greet(userList[key]);
// });

// const user = { name: "John Doe", age: 30, occupation: "Software Engineer" };

// Object.keys(user).forEach((key) => {
//   console.log(`${key}: ${user[key]}`);
// });
