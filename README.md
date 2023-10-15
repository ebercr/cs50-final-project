# Exploring the World of Programming Languages with Eber

#### Video Demo: https://youtu.be/J3_qjtgvrKw?si=lCdkh3yUKu3UTn2d

#### Description:

This project is a website that utilizes Python, Flask, JavaScript, HTML, CSS, Bootstrap, and Jinja to provide information about the significance of programming languages. It aims to educate visitors about various programming languages, such as Python, JavaScript, and C, by offering insights and fun facts. The website also includes an interactive quiz with questions and answers, allowing users to test their knowledge of programming history and these languages. The quiz is designed with a scoring system to evaluate users' performance in answering questions correctly.

The website features a user registration and login system, which is a prerequisite for accessing all the site's pages. During the registration process, the application performs server-side validation in the app.py file to ensure that all fields are filled out correctly, meet character limit requirements, and confirm that the user has entered their password accurately. Once these verifications are complete, the password is hashed using SHA-256 and stored in a SQLite3 database. The database contains a "users" table that holds each user's ID, username, name, hashed password, and a maximum score to track quiz performance.

Upon successful login, users are redirected to the main page at the "/" route and receive a success message from Flask displayed at the top of the site using Message Flashing.

The main page provides information about the project's purpose, emphasizing the importance of programming languages. It also features a Bootstrap carousel with images linking to other pages, such as "quiz," "Python," "C," and "JavaScript." Navigation links to these pages are available in the navbar. Users can access an account information page, allowing them to change their password (if they meet security verification requirements) or view their highest quiz score.

On the "Python," "C," and "JavaScript" pages, users will find summaries of key points in the history of these programming languages, along with YouTube videos featuring language creators or significant contributors discussing their work.

The quiz page presents multiple-choice questions for users to answer. The questions are randomly shuffled each time the quiz is started, and users earn one point for each correct answer. At the end of the quiz, a different message is displayed based on the user's performance. Users have the option to attempt the quiz again or return to the main page. Correctly answered questions are highlighted with a success message, turning the robot above green. Incorrect answers result in the robot turning red, accompanied by a message indicating the correct option.

#### Project Files:

In the project root folder:

- `app.py`: Controls the website's routes and server-side functionality. Handles user sessions, validates HTTP POST methods, and integrates with the database.
- `final_project.db`: Contains the "users" table storing user information for site access and SQL operations.
- `.gitignore`: Configuration file to exclude the "pycache" folder from the GitHub repository.
- `README.md`: This documentation file.

In the "static" folder:

- `quiz.js`: Manages the interactive aspects of the quiz, including an array of questions and functions to load questions onto the HTML page, shuffle their order, check answers, switch button labels between "Check Answer," "Next Question," and "Finish Quiz," reset the quiz, and send score information to the server using AJAX.
- `style.css`: Configures site styles and responsiveness.
- `icon.ico`: Site favicon.
- `eber-logo.png`: Site logo displayed in the navbar.
- `account-bot-300px.png`: Robot image used on the account page.
- `answer-correct-bot-200px.png`, `answer-wrong-bot-200px.png`: Images displayed when users answer questions correctly or incorrectly in the quiz.
- `answer-bot-200px.png`: Image displayed when the user is choosing the answer in the quiz.
- `carousel0.jpg`, `carousel1.jpg`, `carousel2.jpg`, `carousel3.jpg`: Images for the carousel on the main page.
- `code.jpg`: Image featured on the main page.
- `js-logo.png`, `c-logo.png`, `py-logo.png`: Logos for each programming language displayed on their respective pages.
- `register-bot-300px.png`, `login-bot-300px.png`: Robot images used on the registration and login pages.

In the "templates" folder:

- `layout.html`: A template page containing metadata and other standard elements that will be used by other pages.
- `account.html`, `c.html`, `index.html`, `javascript.html`, `login.html`, `python.html`, `quiz.html`, `register.html`: Pages for each route in the website, rendered using the layout.html template.

This project combines various web technologies to create an engaging platform for learning about programming languages and testing one's knowledge. Be sure to explore the different pages, take the quiz, and enjoy your experience on our Programming Languages Website!
