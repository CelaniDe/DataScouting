import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import uploadImg from "../../assets/images/upload.png";
import LoadingImg from "../../assets/images/loading.gif";
import { useNavigate } from "react-router-dom";

const PlaceholderImage = () => (
  <img width={120} src={LoadingImg} alt="loading" />
);

const Library = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const openOutput = () => {
    navigate("/Output");
  };

  const openUpload = () => {
    navigate("/Upload");
  };

  return (
    <div className="outer-main">
      <div className="nav">
        <Navbar />
      </div>
      <div className="main">
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
          <img
            className="img-border"
            onClick={openOutput}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="img-border" onClick={openUpload}>
          <img src={uploadImg} alt="upload an image" className="upload-img" />
        </div>
      </div>
    </div>
  );
};
export default Library;
