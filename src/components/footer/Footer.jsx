import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import './footer.scss'
const Footer = () =>{
    return (
        <div className='footer container'>
            <div className='footer__disb'>
            Copyright MovieHubX © 2022
            </div>
            <div className='social'>
            <a href='https://www.buymeacoffee.com/crafty.dev'><InfoCircleOutlined /></a>
            </div>
        </div>
    );
}

export default Footer;
