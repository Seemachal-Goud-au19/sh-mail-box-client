import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SidebarOption from "./SidebarOption";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../../features/mailSlice";

function Sidebar({ emails, sentEmails }) {
  const [showMore, setShowMore] = useState(false)

  const unReadMails = emails.filter(({ id, data: { from, to, subject, message, isRead, timestamp } }) => !isRead)
  const { pathname } = useLocation()

  const dispatch = useDispatch();

  const showMoreLess = () => {
    setShowMore(!showMore)
  }

  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}

      >
        Compose
      </Button>
      <Link to="/" className="sidebar-link">
        <SidebarOption
          title="Inbox"
          number={unReadMails?.length}
          selected={pathname === '/'}
        />
      </Link>

      {/* <SidebarOption title="Unread" number={unReadMails?.length} /> */}
      <SidebarOption title="Starred" number={0} />
      <SidebarOption title="Drafts" number={0} />
      <Link to="/sent" className="sidebar-link"><SidebarOption title="Sent" number={sentEmails.length} selected={pathname.includes('/sent') && true} /></Link>
      <SidebarOption title="Archive" number={0} />
      <SidebarOption title="Spam" number={0} />
      <SidebarOption Icon={showMore ? ExpandLessIcon : ExpandMoreIcon} showMoreLess={showMoreLess} title={showMore ? "Less" : "More"} />

      {showMore && <div className="sidebar-footer">
        <div className="sidebar-footerIcons">
          <SidebarOption Icon={PhotoSizeSelectActualIcon} title="Photos" />
          <SidebarOption Icon={InsertDriveFileIcon} title="Documents" />
          <SidebarOption Icon={UnsubscribeIcon} title="Subscriptions" />
          <SidebarOption Icon={AddCardIcon} title="Deals" />
          <SidebarOption Icon={LocalAirportIcon} title="Travel" />


        </div>
      </div>
      }
    </div>
  );
}

export default Sidebar;
