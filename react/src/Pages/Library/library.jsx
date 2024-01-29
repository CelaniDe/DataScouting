import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import uploadImg from "../../assets/images/upload.png";
import LoadingImg from "../../assets/images/loading.gif";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ImageAPI } from "../../apis/ImageApi";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: false,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const customStyles = {
  width: '400px', // Set your desired width
  height: '300px', // Set your desired height
  margin: '16px', // Adjust margin as needed
};

const PlaceholderImage = () => (
  <img width={120} src={LoadingImg} alt="loading" />
);

const Library = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesFromApi, setImagesFromApi] = useState([]);

  const navigate = useNavigate();

  const openOutput = () => {
    navigate("/Output?");
  };

  const openUpload = () => {
    navigate("/Upload");
  };

  const getMyImages = async () => {
    try {
      const myImages = await ImageAPI.getAllMyImages();
      if(myImages.length == 0)
      {
        setIsVisible(false);
      }
      else
      {
        setImagesFromApi(myImages);
        setIsVisible(true);
      }
      console.log(myImages);
    } catch (error) {
      
      console.log(error)
    }
  }

  useEffect(() => {
    getMyImages();
  }, [])

  return (
    <div className="outer-main">
      <div className="nav">
        <Navbar />
      </div>
      <div className="main2" style={{display: isVisible ? 'none' : 'flex'}}>
      <div style={customStyles}>
        <Dragger {...props} >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            You have no uploaded images
            <br />
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Please upload a single image with a .png or .jpg suffix.
            <br />
            Avoid uploading sensitive or prohibited files.
          </p>
        </Dragger>
      </div>
      <Button type="primary" value="large" onClick={() => navigate('/Upload')} style={{marginTop: '40px'}}>Upload</Button>
    </div>
      
      <div className="main" style={{display: isVisible ? '' : 'none'}}>
        {
          imagesFromApi.map(
            (element,index) =>
              <div key={index} style={{backgroundImage: {LoadingImg}, height: 'fit-content'}}>
                <img
                style={{objectFit: 'cover'}}
                  className="img-border"
                  onClick={() => {navigate(`/Output?originalLink=${element.originalLink}&detectedLink=${element.detectedLink}&attributesDet=${element.attributesDet}`);}}
                  src={`${element.originalLink}`}
                />
              </div>
          )
        }  
        <div className="img-border" onClick={openUpload}>
          <img src={uploadImg} alt="upload an image" className="upload-img" />
        </div>
      </div>
    </div>
  );
};
export default Library;
