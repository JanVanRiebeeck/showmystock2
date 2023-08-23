export default function UserInfo({ icon, text }) {
  return (
    <div className="user_info">
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
}
