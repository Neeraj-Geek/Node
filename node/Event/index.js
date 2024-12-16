// import event from "events";
// var eventEmitter = new event.EventEmitter();
// eventEmitter.on("my_event", (id) => {
//   console.log(`data received successfully.${id}`);
// });

// eventEmitter.emit("my_event", 1);
// eventEmitter.emit("my_event", 2);

// Real Life Use

import event from "events";

// Create a new instance of EventEmitter
const eventEmitter = new event.EventEmitter();

// Define the 'sendEmail' event listener
eventEmitter.on("sendEmail", (user) => {
  console.log(`Sending email to ${user.email}...`);
  // Simulate sending an email
  setTimeout(() => {
    console.log(`Email sent to ${user.email}`);
  }, 1000);
});

// Define the 'logWelcomeMessage' event listener
eventEmitter.on("logWelcomeMessage", (user) => {
  console.log(`Welcome, ${user.name}! Thanks for signing up.`);
});

// Define the 'notifyAdmin' event listener
eventEmitter.on("notifyAdmin", (user) => {
  console.log(`Admin notified: New user signed up - ${user.name}`);
});

// Simulate a user signup function
function userSignup(name, email) {
  const user = { name, email };

  // Emit the 'userSignedUp' event and pass the user object
  eventEmitter.emit("userSignedUp", user);
}

// Listen to the 'userSignedUp' event and trigger related events
eventEmitter.on("userSignedUp", (user) => {
  eventEmitter.emit("sendEmail", user);
  eventEmitter.emit("logWelcomeMessage", user);
  eventEmitter.emit("notifyAdmin", user);
});

// Simulate a user signing up
userSignup("Neeraj", "n@example.com");
