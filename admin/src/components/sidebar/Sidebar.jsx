import "./sidebar.css";  // link the css file



import {     // import necessary elements from material UI
  LineStyle,  //https://materialui.co/icon/line-style
  Timeline,  //https://mui.com/material-ui/react-timeline/
  TrendingUp,  //https://materialui.co/icon/trending-up
  PermIdentity, //https://materialui.co/icon/perm-identity
  Storefront,   //https://materialui.co/material-icons-sharp/storefront
  AttachMoney, //https://materialui.co/icon/attach-money
  BarChart,         //https://materialui.co/icon/bar-chart
  MailOutline,       //https://materialui.co/icon/mail-outline
  DynamicFeed,        //https://materialui.co/icon/dynamic-feed
  ChatBubbleOutline, // https://materialui.co/icon/chat-bubble-outline
  WorkOutline,
  Report,
} from "@material-ui/icons";     // import necessary elements from material UI  



import { Link } from "react-router-dom"; //A <Link> is an element that lets the user navigate to another page by clicking or tapping on it

export default function Sidebar() {          // create a sidebar component
  return (
    <div className="sidebar">                      
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">          
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
