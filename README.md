# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Run `npm install` to install your dependencies.
- [ ] Build your database executing `npm run migrate`.
- [ ] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.
   Authentication process via tokens in a web application:
   In modern web applications we use HTTP to transmit data between the server side and the client side. When a user logs in to an account a session is created and cookies or JWT can be used to authenticate the users who are accessing the application. In a cookie session the server is responsible for the authentication. The server verifies the session data on the cookie with the session data stored in server memory. This happens when the user initially logs in. When the user logs out from the website, that session data is deleted from the database and the server memory.
   In JWT based authentication we use JSON Web Tokens(JWTs). When the user logs in, the server creates and encrypted token in the form of a JWT and sends it back to the client. When the client recieves a token, it means the user is authenticated to perform any activity using the client.
   On the logout operation, the token on the client-side is destroyed without server interaction.
2. What does `bcryptjs` do to help us store passwords in a secure manner?
   `bcryptjs` incorporates salt both manually and automatically to protect against rainbow table attacks, it uses a password hashing funtion, and has accumulative hasshing rounds. Bycrypt is an adaptive function and is compatible with C++ bycrypt binding.
3. How are unit tests different from integration and end-to-end testing?
   In end-to-end testing, the behavioral flow of the software is tested. It focuses on functional verification by checking that individual, isolated parts work as expected. Integration testing verifies that several units work together in harmony. The purpose of integrated testing is to expose the faults in the interaction between integrated units.
4. How does _Test Driven Development_ change the way we write applications and tests?
   Test-driven development is a process of modifiying the code in order to pass a test designed previously. This form of testing includes refactoring a code i.e. changinf/adding some amount of code to the existing code without affecting the behavior of the code. TDD should result in faster, more extensible code with fewer bugs that can be uppdated with minimal risks.
