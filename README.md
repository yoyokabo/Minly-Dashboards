**Welcome!**

This project served as a fantastic learning journey for me, venturing into a new tech stack and expanding my web development knowledge. I particularly enjoyed working with TypeScript - the linter's ability to point out edge case saved me many times.
I was also reminded of how much I hate css , I truly have a new found appreciation for front end development never through centering an image on my screen would turn into a 30 minute task, but hey thats css.
Without further ado I present you with some barebones documentation.

**Important Note:**

The application currently requires an Android emulator due to iOS's default restriction on HTTP requests (HTTPS only is supported). I successfully ran it using the Android Studio emulator with Pixel 8 Pro (Android 13 Tiramisu). Feel free to refer to the image below to replicate my settings:


![image](https://github.com/yoyokabo/Minly-MediaSharing/assets/51433565/84a9a2f3-c638-4894-bd8d-81170cca1081)


**Tech Stack:**

* Persistence: MongoDB
* Backend: Node.js (TypeScript), Express
* Website: React (TypeScript)
* Mobile App: React Native, Expo, Tailwind CSS

**Backend Setup:**

1. **Prerequisites:**
    * Node.js and npm installed globally
    * MongoDB installed and running

3. **Installation:**
   Make Sure your terminal is in the correct folder when installing dependancies for each of the projects
    ```bash
    npm install --legacy-peer-deps
    ```

5. **Starting the Backend:**
    ```bash
    npm start
    ```

**Available API Endpoints:**

**POST /api/users/register**

Request Body:

```json
{
  "email": "<user's email address>",
  "username": "<user's chosen username>",
  "passwordhash": "<hashed password>"
}
```

Response:

```json
{
  <user object>
}
```

**POST /api/users/login**

Request Body:

```json
{
  "username": "<user's username>",
  "password": "<user's password>"
}
```

Response:

```json
{
  "token": "<JWT token>"
}
```

(Token expires in 1 hour)

**GET /api/posts**

Response:

```json
[
  { <post object 1> },
  { <post object 2> },
  ...
]
```

(Posts listed in reverse chronological order)

**GET /api/posts/:postID**

Path Parameter:

* `:postID` - The ID of the post

Response:

```json
{
  <post object>
}
```

(Post details if ID is found)

**POST /api/posts**

Request Body:

(Multipart form data containing a single file and additional data)

```
<file data>
caption: "<post caption>"
jwtToken: "<user's JWT token>"

```

Response:

```json
{
  <created post object>
}
```

**PATCH /api/posts/:postID**

Path Parameter:

* `:postID` - The ID of the post

Response:

```json
{
  "likes": <updated number of likes>
}
```

(Likes/unlikes a post and returns the updated like count)

**DELETE /api/posts/:postID**

Path Parameter:

* `:postID` - The ID of the post

Response:

* (No response body, successful deletion indicated by status code)

**GET /api/media/:id**

Path Parameter:

* `:id` - The ID of the post (used to retrieve associated media)

Response:

* (The file associated with the post ID)

**Website:**

**Installation:**
    ```
    npm install 
    npm start
    ```
* **Pages:**
    * Home: Displays all posts, captions, likes, timestamps, and a like button (if logged in)
    * Register: Registers a new user (no immediate login)
    * Login: Logs in a user and stores the JWT token locally
    * Posts: Allows users to create posts with captions and media (requires a valid JWT token)

**Mobile App:**

**Installation:**
    ```
    npm install 
    npm start
    ```

* **Landing Page:**
    * Greets the user and prompts for login
    * Redirects to the Home page automatically if a valid token is found in local storage

* **Login:** Allows users to log in and stores the JWT token

* **Register:** Registers a new user (redirects to Home page upon successful registration, otherwise allows registration)

* **Home:** Displays all posts, captions, likes, timestamps, and a like button (using stored token)

* **Post:**
    * Prompts user for a caption and image/video file
    * Shows a preview of the post
    * Sends caption and file to backend and returns user to home page

 **Note to Reviewer**
Thank you for considering my submission. If you encounter any issues or have feedback, please let me know.
