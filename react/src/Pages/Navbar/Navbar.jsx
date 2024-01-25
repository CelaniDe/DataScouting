import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import uploadImg from "../../assets/images/upload.png";

const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const openLibrary = () => {
    navigate("/Library");
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
        onClick={openLibrary}
        icon={<UserOutlined />}
      />
    </div>
  );
};
export default App;
