import "./style.css";
import photoIcon from "../../../src/styles/icons/icons8-photo-100.png";
import documentIcon from "../../../src/styles/icons/icons8-document-94.png";
import locationIcon from "../../../src/styles/icons/icons8-location-40.png";
import contactIcon from "../../../src/styles/icons/icons8-contact-40.png";
import pollIcon from "../../../src/styles/icons/icons8-poll-64.png";
import colorIcon from "../../../src/styles/icons/icons8-color-wheel-48.png";

export default function PlusMenu() {
  return (
    <div className="plus_container">
      <div className="plus_item">
        <div className="plus_item_icon">
          <img src={photoIcon} alt="" />
        </div>
        <div className="plus_item_description">Photo & Video Library</div>
      </div>
      <div className="plus_item">
        <div className="plus_item_icon">
          <img src={documentIcon} alt="" />
        </div>
        <div className="plus_item_description">Document</div>
      </div>
      <div className="plus_item">
        <div className="plus_item_icon">
          <img src={locationIcon} alt="" />
        </div>
        <div className="plus_item_description">Location</div>
      </div>
      <div className="plus_item">
        <div className="plus_item_icon">
          <img src={contactIcon} alt="" />
        </div>
        <div className="plus_item_description">Contact</div>
      </div>
      <div className="plus_item">
        <div className="plus_item_icon">
          <img src={pollIcon} alt="" />
        </div>
        <div className="plus_item_description">Poll</div>
      </div>
      <div className="plus_item">
        <div className="plus_item_icon">
          <img src={colorIcon} alt="" />
        </div>
        <div className="plus_item_description">Background Color</div>
      </div>
    </div>
  );
}
