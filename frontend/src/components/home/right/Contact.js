export default function Contact({ user }) {
  let displayName;
  if (user?.details?.accountType === "company") {
    displayName = user?.details?.companyName || "Company: Not Set";
  } else if (user?.details?.accountType === "personal") {
    displayName =
      user?.details?.firstName && user?.details?.lastName
        ? `${user.details.firstName} ${user.details.lastName}`
        : "Personal: Not Set";
  }

  // Update user.picture to get the picture of the users clients / friends
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user.picture} alt="" />
      </div>
      <span>{displayName}</span>
    </div>
  );
}
