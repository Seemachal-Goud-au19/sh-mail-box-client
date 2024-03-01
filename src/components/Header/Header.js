import React, { useContext }  from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";
import { auth } from "../../firebase.js";

import CartContext from "../../store/cart-context.js";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const cartCtx = useContext(CartContext)
  const userEmail = localStorage.getItem('email')

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="header">
      <div className="header-left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRceIIBz4GgeNszaN5SupI6p1SJE_Bzgk3Q&usqp=CAU"
          alt="yahoo logo"
          src = "https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png"
        />
      </div>
      <div className="header-middle">
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDownIcon className="header-inputCaret" />
      </div>
      <div className="header-right">
    
           <Tooltip title={<h2>{userEmail}</h2>}>
        <Avatar onClick={cartCtx.logout}/>
        </Tooltip>
      </div>
    </div>
  );
}

export default Header;
