const xhr = new XMLHttpRequest();//creates a new HTTP message to send to the backend (message = request)

//treats the response as an event so on send() it will display.
xhr.addEventListener('load', () =>{
  console.log(xhr.response());
});

//Set up the request
xhr.open('GET', 'https://supersimplebackend.dev'); //The first param is what type of HTTP message to send. The second param tells the computer where to send this HTTP message(using a URL).
//GET = get some information from the backend

//Send the message
xhr.send();

//get the response in the code
// xhr.response
//Note: There's a slight problem with doing this. It takes time for the request to travel across the internet to the backend and for the response to come back.
//Therefore, the response is not available right away causing xhr.response = undefined at first 
//xhr.send() is known as aysnchronous code (means it does not wait for a line of code to finish, it just sends the request and immediately goes to the next line )