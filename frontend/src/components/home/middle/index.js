import "./style.css";
import CreatePost from "../../createPost";

export default function MiddleHome() {
  return (
    <div className="home_middle">
      <div className="home_middle_top">
        <CreatePost />
      </div>
      <div className="home_middle_bottom">
        <div className="box">Item 1</div>
        <div className="box">Item 2</div>
        <div className="box">Item 3</div>
        <div className="box">Item 4</div>
        <div className="box">Item 5</div>
        <div className="box">Item 6</div>
        <div className="box">Item 7</div>
        <div className="box">Item 8</div>
        <div className="box">Item 9</div>
      </div>
    </div>
  );
}
