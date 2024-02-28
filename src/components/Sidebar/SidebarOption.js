import React from "react";
import "./SidebarOption.css";

function SidebarOption({ Icon, title, number, selected, showMoreLess }) {
  return (
    <div className={`sidebarOption ${selected && "sidebarOption--active"}`} onClick={showMoreLess}>
      {Icon && <Icon />}
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}

export default SidebarOption;
