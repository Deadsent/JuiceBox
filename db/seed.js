// inside db/seed.js

// grab our client with destructuring from the export in index.js
const { client, getAllUsers, createUser } = require("./index");

async function dropTables() {
  try {
    console.log("Dropping Tables...");

    await client.query(`
    DROP TABLE IF EXISTS users;
      `);

    console.log("Tables Dropped.");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
}

// this function should call a query which creates all tables for our database
async function createTables() {
  try {
    console.log("Building Tables.");

    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
        );
      `);

    console.log("Table Built");
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
}

async function createInitialUser(){
    try {
        console.log("Creating Users.")
        
        const albert = await createUser({username: 'albert', password: 'bertie99'})
        const sandra = await createUser({username: 'sandra', password: '2sandy4me'})
        const glamgal = await createUser({username: "glamgal", password: "soglam"})


        console.log(albert, sandra, glamgal)

        console.log("finished creating users!")
    } catch(error){
        console.error("Error creating user")
        throw error
    }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUser();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Testing Database");
    const users = await getAllUsers();
    console.log("getAllUsers:", users);
    console.log("Finished database testing.");
    console.log(users);
  } catch (error) {
    console.error("Error testing database");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
