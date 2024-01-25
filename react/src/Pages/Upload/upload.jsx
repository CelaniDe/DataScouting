import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ImageAPI } from "../../apis/ImageApi";



const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: false,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  async onChange (info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info.file);
      await ImageAPI.uploadImage(info.file);
      window.location.replace('/');
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
const App = () => {
  

  return(
  <div className="outer-main">
    <div className="nav">
      <Navbar />
    </div>
    <div className="main2">
      <div style={customStyles}>
        <Dragger {...props} >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Please upload a single image with a .png or .jpg suffix.
            <br />
            Avoid uploading sensitive or prohibited files.
          </p>
        </Dragger>
      </div>
      {/* <Button type="primary" value="large" onClick={() => navigate('/Upload')} style={{marginTop: '40px'}}>Upload</Button> */}
    </div>
  </div>
  )
};
export default App;
