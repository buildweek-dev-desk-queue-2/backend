## Backend

Hey welcome to our API!!! The server is hosted at https://bw-node.herokuapp.com/ 

## Endpoints

## Auth

 - Register 
 - https://bw-node.herokuapp.com/register
 - Data shape: 
   {
      "username": "Username goes here! REQUIRED", 
      "password": "Password goes here! REQUIRED",
      "email": "email goes here! REQUIRED",
      "account_type": "If normal user, leave this blank. If trying to sign up an admin, the value for this should be just admin"
   }

 - Login
 - https://bw-node.herokuapp.com/login
 - Data shape:
   {
      "username": "username!",
      "password":"password!"
   }
 - Will return a token. Store this in the "authorization" header to be able to access protected API routes. 

## Tickets

 - https://bw-node.herokuapp.com/ticket/
 - GET request to here will return ALL of the tickets.
 - POST request to here will add a new ticket.
   - Data shape:
   {
	"title":"ticket title goes here! REQUIRED",
	"description":"Description! REQUIRED",
   "user_id":"The submitter's ID. INTEGER. REQUIRED."
   }

 - https://bw-node.herokuapp.com/ticket/:id
 - GET request to here will return the ticket with the correct ID.
 - PUT request to here will update the specified ticket with whatever information you pass.
   - Keys you can update:
      - "title" STRING
      - "description" STRING
      - "user_id" INTEGER. Advised not to change this.
      - "completed" INTEGER standing in for a boolean. 0 = false, 1 = true.
 - DELETE request to here wil delete the specified ticket.
  

## Feedback

 - https://bw-node.herokuapp.com/feedback/
 - GET request to here will return ALL of the feedback. Probably good for an admin view.

 - https://bw-node.herokuapp.com/feedback/:ticketId
 - GET request to here will return all feedback ASSOCIATED WITH A TICKET. This route is a findFeedbackByTicketID.
 - POST request to here will insert a new "feedback" resource on the specified ticket.
   - Data shape: 
   {
      "author_id": "The ID belonging to the author of this message. REQUIRED. MUST EXIST IN USERS TABLE.",
      "message": "The text that this feedback/message should have. String. Required!"
   }

 - https://bw-node.herokuapp.com/feedback/id/:id
 - GET request to here will return the feedback with the corresponding ID. This is a findFeedbackByID route.
 - PUT request to here will change this feedback's information.
   - Keys you can update:
      - "message" Adjusts the text of the message. This is about the only thing you can change.
 - DELETE request to here will delete the specified feedback resource.