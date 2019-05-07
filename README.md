# Traffic Violation Ticketing System

This project was developed as the semester long project for CSE327: Software Engineering Course at North South University. 

This project basically aims to speed up the ticketing process for Traffic Sergeants by using their mobile phones and issue tickets by taking a couple of photos. 

# Features
The project consists of the following features:

- 3 different types of Users: Police, Administrator, Regular User(Driver).
- The Police is responsible for issuing tickets to traffic violating car drivers. They can also view past issued tickets.
- The Administrator is responsible for resolving the tickets after the driver pays the fine. They can see all the data in the system except for credentials.
- The Driver will only be able to receive tickets and check their previously received tickets.

# Files

Under the **project** directory you will find three different sub-folders. 
- The **client** directory refers to the front-end of the application which has been developed using React and Redux. All the applicable design patterns were followed during development.
- The **server** directory is designated for the REST API server codes. This was developed using the Express Framework built on top of Node.js library. We primarily used MVC pattern to develop this system.
- The Unit Test codes can be found under the **test** directory which is inside the **server** directory. The unit test codes were written using the javascript library called Mocha and used assertion functions from the library called Chai.
- For **Data Management** on the server side we used an **Object Relational Mapping** library for performing encapsulated Database Queries and Model Definitions.
- The **mobile** directory is designated for the mobile version of the project. The mobile version is only developed for the traffic police so, they are only able to take photos and issue tickets.
- **MySQL** was used as primary database engine for the project.
