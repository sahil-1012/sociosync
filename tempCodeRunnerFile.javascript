const fullName = "John Doe PRASD"; // Replace with your full name

// Use the split method to split the full name into an array of parts
const nameParts = fullName.split(' ');

// Assuming there is at least one space in the full name
const firstName = nameParts[0]; // The first part
const lastName = nameParts.slice(1).join(' '); // The rest as the last name

console.log("First Name:", firstName);
console.log("Last Name:", lastName);
