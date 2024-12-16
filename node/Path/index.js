import path from "path";
let address = "C:/users/joe/file.txt";

console.log(path.basename(address)); //return file.txt
console.log(path.dirname(address)); //return C:/users/joe
console.log(path.extname(address)); //return .txt

console.log(path.basename(address, path.extname(address))); //return file

console.log(path.join("/", "users", "any", "notes.txt")); // '/users/joe/notes.txt'

console.log(path.resolve("index.js")); // N:\wd\Node\path\index.js if run from my home folder

console.log(path.resolve("/etc", "joe.txt")); // '/etc/joe.txt'

console.log(path.normalize("/users/joe/..//test.txt")); // '/users/test.txt'
