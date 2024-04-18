# React Chat Backend

This is your first pair/group coding project!

You will be creating a piece of full stack software: a chat application.

You will be utilize the full MERN stack to do so: M(ongoose/MongoDB), E(xpress), R(eact), and N(ode).

The React part of the project will be completed next week once you're done learning framework fundamentals. Right now, we will focus on making sure our back end performs all necessary logic to support the front end.

Clone the following repository to your projects folder, then `cd` into `server` folder and run `npm i` to install all of the dependencies.

## Message Schema

Your message document in your `messages` collection should resemble the following:

```json

{
    "when": "2018-07-15T20:00:47.696Z",
    "user": "John",
    "room": "Main",
    "body": "I really want to attend NASA's DEVELOP program this summer!"
}

```

## User Schema

Your user document in your `users` collection should resemble the following:

```json

{
    "firstName": "John",
    "lastName": "Wick",
    "email": "jwick@puppyfinder.com",
    "password": "focusCommitment1979"
}

```

## Room Schema

Your room document in your `rooms` collection should resemble the following:

```json

{
    "name": "Continental",
    "description": "No business conducted",
    "addedUsers": ["John Wick", "Winston", "Ms. Perkins"]
}

```
> HINT
> `user`, `room`, and `addedUsers` refer to connection between users and their room and messages.
> It's usually a good idea to utilize _id's to reference those.

## Stories

### Users

- [ ] Create user endpoint
- [ ] Login user endpoint

### Rooms

- [ ] Create endpoint
- [ ] Display all rooms endpoint

### Messages

- [ ] Display all messages within a room endpoint
- [ ] Create a message within a room endpoint
- [ ] Update a message within a room endpoint
- [ ] Delete a message within a room endpoint

## Icebox

As this is a group project, it would be much easier to work on it if everyone had access to the same data. For that reason:

- [ ] Setup MongoDB Atlas cluster and utilize it to CRUD your database for this project. You must utilize .dotenv in this project to hide your username, password, and your connection string away from prying eyes of other GitHub users.

- [ ] Add `update` and `delete` endpoints to your `rooms` controller
- [ ] Add `update` and `delete` endpoints to your `users` controller

> HINT
> Allowing updates on users means that collection associations need to be based on things user **CANNOT** change.

- [ ] Add isAdmin to your user collection and build middleware that only allows admins to update and delete rooms and messages.

# React Chat Front End

Congratulations! You have successfully completed the backend section of the project, where you utilized Postman to test your API and make sure the routes are accessible and the data flows back and forth between your server and database.

Now, it's time to build a user interface that your users will be able to interact with.

## Stories

### Setup

Utilize `create-react-app` script to create a new instance of a React app within your `client` folder. Purge all unnecessary files and code until you have a fresh React blueprint. Create a `components` folder where you will store all of the components needed for this application.

### Auth Component

This component should allow the user to register and signup. It will require conditional rendering to switch between both states.

It's functional end result should update the `localStorage` token in the browser's client. The token functionality is best put inside `App.jsx` so that other components can freely use it as well.

### Rooms Component

This component should allow the user to view all available rooms to them. When clicked upon a room, they should be invited to respective room. This can be a separate component or one that shows up in nav-like fashion. If the latter is your preference, please skip to the next component.

### Room Component

This component should consist of two sub-components: input and the view. The input allows user to input text into the field. After the input has been registered, the user will have a `send` button to the right of the field. This button should send the request over to the server's respective endpoint.

> HINT
> In order to mimic WebSockets functionality (stateful), fetch data from the server each time a request is sent.
> This will allow client to view the new message immediately in the display field.

The view sub-component should consist of an area where users can see all of the messages within a particular room.

> NOTE
> This application will be viewed by your potential employers. We don't specify any styling requirements.
> It might be a good idea to utilize flex or grid and make sure it's visually simple and appealing to the eyes.

## Icebox

- [ ] Server has full CRUD functionality on messages. Basic requirement of this application is to send and retrieve messages. Add a button next to each message which will allow you to select `edit` and `delete` options. This will then send a request to update or delete respective message.

- [ ] The user should only be allowed to delete their own messages.

- [ ] Add admin functionality check which allows an admin to delete any messages.

