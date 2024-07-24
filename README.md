
## Recipe Sharing Platform backe edn implementation
This is a recipe sharing platform where users can share their recipes and other users can view and comment on

This platform  allows users to share, browse, and manage recipes. The primary functionalities include user registration, authentication, and the ability to create, update, delete, and view recipes and comments.

## Technologies (Tech Stack)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT), bcrypt

## Setup Instructions

### Prerequisites
- Node.js 
- MongoDB (local or Atlas)

### Installation
1. **Clone the repository:**
   ```sh
   https://github.com/joseph-birara/A2sv_back_end_assessment.git
   cd A2sv_back_end_assessment
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_port
   ```

4. **Run the server:**
   ```sh
   npm run dev
   ```

