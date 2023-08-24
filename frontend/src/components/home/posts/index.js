import "./style.css";
import createPostIcon from "../../../styles/icons/icons8-create-post-64.png";
import plusIcon from "../../../styles/icons/icons8-plus-50.png";

export default function Posts() {
  return (
    <div className="posts">
      <div className="create_post_card">
        <img src={createPostIcon} alt="" />
        <div className="plus_post">
          <img src={plusIcon} alt="" />
        </div>
        <div className="post_create_text">Create Post</div>
      </div>
    </div>
  );
}
