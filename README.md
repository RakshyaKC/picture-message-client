
A React front-end app for sending a picgram using Rails backend. The backend repo can be found at https://github.com/RakshyaKC/picture-message. The app can be found at https://rakshyakc.github.io/picture-message-client/#/

# Technology used
* React
* NPM packages
* WebcamCapture
* Github

# User stories
* Authenticate (sign up, in, out, change password)
* Create a picture / (take or upload a picture) --CREATE
* Select user to send picture to
* Send picture
* Receive notification for new pic message
* Check inbox
* See who new message is from
* Receive a picture --READ
* User can see if the pic was seen or unseen --UPDATE
* User can delete picture from their inbox --DELETE

# Wireframe
https://docs.google.com/drawings/d/196TQ3u8dXndVY7vDZtWoil_a36Zy3wwe9IOrTJp-7ds/edit?usp=sharing

# App screenshot
https://drive.google.com/file/d/1Hu0zLSctX-sQh29OGbkjWMo5-TywLiNZ/view?usp=sharing
https://drive.google.com/file/d/1biXDhoARQjd6fBb2e18O32q2YU2ydooJ/view?usp=sharing


# To use webcam
* Downloaded React package - WebcamCapture.js
* Create a button for ‘sending pic’
* Create a function to turn base64 image into blob
* Create an api call to send blob to backend
* In backend image_uploader.rb, remove extension white list as blob isn't saved as image file
* To create folder hierarchy in s3, uncomment below in image_uploader.rb
def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
end

# To get list of all users
* Create User List component, render it under webcam and buttons
* On “mount” in User List component, call “getUsers” api function
* This function will GET the /users index
* Then save these users into “this.state”
* Show dropdown with all users by looping over “this.state”


# For image upload in React using FormData()
(https://medium.com/@rose_shumei_huang/carrierwave-in-a-react-app-247ff7d7aff3)
* Created pic-messaging/components/CreatePicMessage.js
* Imported above component into App.js
* Add authenticated route to 2 in App.js
* Adding link to component in Header.js
* In Api.js, send webcam image file via fetch method.
* Using FormData, and nesting under “image” key
* In the backend it will hit routes.rb, then picture controller, then picture model, then image uploader, which saves the file in AWS s3

# Send a message
* When a user is selected, and a pic has been taken, “Send Message” button needs to send the * picture_id, sender_id, and receiver_id to POST /messages
* Hoisting WebamCapture(picture_id) and user list(receiver_id) to CreatePicMessage(sender_id)
* User is passed from app.js to createPicMessage component
* Api call is made with header and token for authentication

# Receive a message
* Make an Inbox component and display on header as Link
* Add authenticated routes and pass user to Inbox inside App.js
* On component mount,
* Call getMessages api function
* This function will GET the /messages using receiver_id
* setInterval to run every second
* Send seenMessage api function
* To update seen:null to seen:true
* In render,
    * If message.seen===null, bold
    * if message.seen===true, not bold
* Render a list of messages to choose from
* onClick function makes api call to update message from seen: null to seen: true
  * Style changes to make the updates apparent on front end

# Future issues to be solved
* Stylistic changes
* Use websocket or action cable instead of making api calls frequently.
* Ensure threading of conversations
* Inbox link will be highlighted if new messages are received
* Add profile pictures for users
* Enable users to experiment with epsilon photography using just their webcam
* Friend particular user instead of listing all users on the app

# Deployment
https://git.generalassemb.ly/ga-wdi-boston/react-template#deployment
$npm run build
$npm run deploy
