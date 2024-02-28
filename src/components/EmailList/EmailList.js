import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";

function EmailList({ emails, type }) {
  return (
    <div className="emailList">
      <div className="emailList-settings">
        <div className="emailList-settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
        </div>

      </div>
      <div className="emailList-list">
        {emails.map(({ id, data: { from, to, subject, message, isRead, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={type==="sent" ? to : from}
            subject={subject}
            description={message}
            isRead={isRead}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
            type={type}
          />
        ))}

      </div>
    </div>
  );
}

export default EmailList;
