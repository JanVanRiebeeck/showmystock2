// ErrorWithTopArrow.js
// In ErrorWithTopArrow.js
import "./ErrorWithTopArrow.css";

export default function ErrorWithTopArrow({ message }) {
  return (
    <div className="error_with_arrow">
      <div className="error_arrow_bottom"></div>
      <div className="error_message">{message}</div>
    </div>
  );
}
