const { Inngest } = require("inngest");
const USER = require("../models/User");

// Create a client to send and receive events
const inngest = new Inngest({ id: "my-app" });

//Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };
    await USER.create(userData);
  }
);

//Inngest Function to delete user data from the database
const syncUserdeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await USER.findByIdAndDelete(id);
  }
);

//Inngest Function to update user data in the database
const syncUserUpdation = inngest.createFunction(
  { id: "updated-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };
    await USER.findByIdAndUpdate(id, userData);
  }
);

// Create an empty array where we'll export future Inngest functions
const functions = [syncUserCreation, syncUserdeletion, syncUserUpdation];

module.exports = {
  inngest,
  functions,
};
