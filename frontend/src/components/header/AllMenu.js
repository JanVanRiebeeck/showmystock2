import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTruck } from "@fortawesome/free-solid-svg-icons";
import truckIcon from "../../styles/icons/icons8-truck-48.png";
import clientsIcon from "../../styles/icons/icons8-clients-64.png";
import balanceScaleIcon from "../../styles/icons/icons8-balance-scale-48.png";
import invoiceIcon from "../../styles/icons/icons8-invoice-100.png";
import inventoryIcon from "../../styles/icons/icons8-inventory-100.png";
import analysisIcon from "../../styles/icons/icons8-analyze-64.png";
import advertiseIcon from "../../styles/icons/icons8-advertise-64.png";
import relationsIcon from "../../styles/icons/icons8-related-companies-100.png";
import billingIcon from "../../styles/icons/icons8-billing-machine-100.png";
import forumIcon from "../../styles/icons/icons8-boardroom-64.png";
import webinarIcon from "../../styles/icons/icons8-webinar-48.png";
import feedbackIcon from "../../styles/icons/icons8-feedback-100.png";
import learningIcon from "../../styles/icons/icons8-learning-48.png";
import settingsIcon from "../../styles/icons/icons8-settings-64.png";
import favouriteIcon from "../../styles/icons/icons8-favorite-folder-48.png";
import supportIcon from "../../styles/icons/icons8-support-100.png";

export default function AllMenu({ color }) {
  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClickInside}>
      <div className="all_menu">
        <div className="all_menu_header">Menu</div>
        <div className="all_menu_wrap scrollbar">
          <div className="all_left">
            <div className="all_menu_search">
              <FontAwesomeIcon color={color} icon={faSearch} />
              <input type="text" placeholder="Search Menu" />
            </div>
            <div className="all_menu_group">
              <div className="all_menu_group_header">Discover & Connect</div>
              <div className="all_menu_item hover1">
                <img src={truckIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Find Suppliers</span>
                  <span className="span_description">
                    Search for and view supplier profiles
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={clientsIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Find Clients</span>
                  <span className="span_description">
                    Explore potential clients looking for your products
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={balanceScaleIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Marketplace Search</span>
                  <span className="span_description">
                    Browse products and services in the marketplace
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={invoiceIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Quotes</span>
                  <span className="span_description">
                    Send or request quotes from suppliers/clients
                  </span>
                </div>
              </div>
            </div>
            <div className="all_menu_group">
              <div className="all_menu_group_header">Manage & Monitor</div>
              <div className="all_menu_item hover1">
                <img src={inventoryIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Inventory Management</span>
                  <span className="span_description">
                    Track supplier inventory, track client inventory.
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={analysisIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Analytics & Reporting</span>
                  <span className="span_description">
                    Access reports and analysis on page views, ads and products
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={advertiseIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">
                    Advertisements & Promotions
                  </span>
                  <span className="span_description">
                    Manage your ads on the marketplace, manage promotions
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={relationsIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">
                    Supplier & Client Relations
                  </span>
                  <span className="span_description">
                    Review and manage your connections with suppliers and
                    clients
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={billingIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Subscription & Billing</span>
                  <span className="span_description">
                    View and manage your subscription plan, view billing history
                  </span>
                </div>
              </div>
            </div>
            <div className="all_menu_group">
              <div className="all_menu_group_header">Engage & Network</div>
              <div className="all_menu_item hover1">
                <img src={forumIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Forums & Discussions</span>
                  <span className="span_description">
                    Participate in or start discussions on relevant topics, ask
                    questions and share insights
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={webinarIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Events & Webinars</span>
                  <span className="span_description">
                    Find or host industry-related events, webinars and workshops
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={feedbackIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">User Feedback & Reviews</span>
                  <span className="span_description">
                    Write and read reviews on suppliers, products and services
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={learningIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Learning & Resources</span>
                  <span className="span_description">
                    Access to tutorials, guides, best practices, industry news
                  </span>
                </div>
              </div>
            </div>
            <div className="all_menu_group">
              <div className="all_menu_group_header">Personal & Support</div>
              <div className="all_menu_item hover1">
                <img src={settingsIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Profile & Settings</span>
                  <span className="span_description">
                    Manage personal details, preferences and privacy settings
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={favouriteIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Wishlist & Favorites</span>
                  <span className="span_description">
                    Save favorite suppliers, products, or posts to easily access
                    later
                  </span>
                </div>
              </div>
              <div className="all_menu_item hover1">
                <img src={supportIcon} alt="Truck Icon" />
                <div className="all_menu_col">
                  <span className="span_heading">Help & Support Center</span>
                  <span className="span_description">
                    Access FAQs, guides, live chat support, or submit support
                    tickets
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
