# Messenger
Simple REST APIfor managing messages as well as checking if a message is a palindrome. Following actions are supported by the API
- Create, retrieve, update, and delete a message
- List messages
- Check if a message is a palindrome

Application is developed using node js. You need to have node and node package manager (npm) installed to run the application. 

- To install run : npm install
- To run application run : npm start 
(In the root folder)

It is also possible to run the application using docker.

- build docker image and give it a tag name: docker build -t <tagname> .
- run docker: docker run -p 8080:8080 <tagname>

The application will be listening on "http://127.0.0.1:8080/"


 

