import "./style.css";

export default function LeftHome({ user }) {
  return (
    <div className="left_home">
      <div className="left_link">
        <img className="user_image" src={user?.picture} alt="User's avatar" />
        <span>
          {user?.details?.accountType
            ? user.details.accountType
            : "TODO: User Type company or personal"}
        </span>

        <span>
          {user?.companyName
            ? `Company: ${user.companyName}`
            : "Company: Not Set"}
        </span>
        <span>
          {user?.name ? `Personal: ${user.name}` : "Personal: Not Set"}
        </span>
      </div>

      <button className="follow_btn">Follow User</button>
      <div className="bio">{user?.bio ? user.bio : "Bio not available."}</div>
      <div className="location">
        {user?.location ? user.location : "Location not set"}
      </div>
      <div className="services">
        {user?.services ? user.services : "No services or products mentioned."}
      </div>
      <div className="review_score">
        Review Score: <a href="/path-to-user-reviews">TODO: Calculate Score</a>
      </div>
      <div className="recent_activity">
        {user?.recentActivity ? user.recentActivity : "No recent activity"}
      </div>
      <div className="member_since">
        {user?.memberSince ? user.memberSince : "Member since not available"}
      </div>

      <hr className="divider" />

      <div className="user_links">
        <a href={user?.website} target="_blank" rel="noopener noreferrer">
          Website
        </a>
        <a href={user?.youtube} target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
        <a href={user?.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={user?.twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href={user?.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href={user?.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </div>
  );
}
