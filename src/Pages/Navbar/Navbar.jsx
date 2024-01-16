import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const openLibrary = () => {
        navigate('/Library');
      };

    return(<div>
        <Button style={{transition: 'all 0.3s linear'}} type="text" value="large" onClick={() => navigate('/Upload')}>Upload</Button>
        <Avatar
        style={{marginLeft: '10px'}}
        size="large"
        className='user'
        onClick={openLibrary}
        icon={<UserOutlined  />}
        />
      </div>);
};
export default App;

