import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

import { ipcRenderer } from "electron";

import '../css/setting.css'


import settingImg from '../assets/img/setting.png'


const openWindow = () => {
  console.log("ipc clicked")
  ipcRenderer.send('asynchronous-message', 'Test message');
}

const Setting = () => {

  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div >
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <>
      <img className='setting-icon' src={settingImg} alt=""  onClick={openWindow} />
    </>
    // <div>
    //   <button type="button" onClick={handleOpen}>
    //     Open Modal
    //   </button>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="simple-modal-title"
    //     aria-describedby="simple-modal-description"
    //   >
    //     {body}
    //   </Modal>
    // </div>
  );
}

export default Setting;