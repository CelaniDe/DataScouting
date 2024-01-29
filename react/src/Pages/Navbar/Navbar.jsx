import React, { useState, useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import uploadImg from "../../assets/images/upload.png";
import AuthContext from "../AuthContext/AuthContext";

const App = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      // setOpen(false);
      navigate('/');
    }
    else if (e.key === '2') {
      // setOpen(false);
      logout();
    }
  };


  const items = [
    {
      key: '1',
      label: 'Library'
    },
    {
      key: '2',
      label: 'Logout'
    },
  ];


  const [isHovered, setIsHovered] = useState(false);

  

  const openLibrary = () => {
    navigate("/");
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <Button
        style={{ transition: "all 0.3s linear", border: "1px solid grey", padding: 'auto' }}
        type="text"
        value="large"
        onClick={() => navigate("/Upload")}
      >
        <img src={uploadImg} alt="upload image" style={{height: '12px', marginRight: '7px'}} />
        Upload
      </Button>
      <Dropdown menu={{items,onClick : handleMenuClick}}>
        <Avatar
          style={{
            transition: "filter 0.2s linear",
            marginLeft: "30px",
            marginTop: '-3px',
            // border: "1px solid lightblue",
            backgroundColor: 'rgba(0, 207, 222, 1)',
            cursor: isHovered ? "pointer" : "default",
            filter: isHovered ? "drop-shadow(1px 1px 2px #6b6b6b)" : "none",
          }}
          size="large"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          // onClick={openLibrary}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
};
export default App;
