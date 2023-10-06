# SpringReactNoteApp
Full Stack React + Spring boot applications that preforms simple CRUD operations.
Used to store personal notes and modify them.

To run this file locally, you must have a SQL table set up, and you may need to modify the application.properties file to connect to your local SQL schema. 
The current version redirects to a folder named 'NoteTaker application.' The appropriate schema should look like the following:

CREATE TABLE Note (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(500),
    name VARCHAR(255)
);
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/GL5WTlMWqiw/0.jpg)](https://www.youtube.com/watch?v=GL5WTlMWqiw)

