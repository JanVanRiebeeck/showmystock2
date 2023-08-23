import { useParams } from "react-router-dom";

function UserFeed() {
  const { username } = useParams(); // Get username from the URL

  // Fetch and display the user's feed using the username
  // ...

  return <div>{/* Display user's feed */}</div>;
}

export default UserFeed;
