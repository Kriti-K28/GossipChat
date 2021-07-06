import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import {Modal,Button} from 'react-bootstrap';

import './Input.css';

import TextContainer from '../TextContainer/TextContainer';
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
       
        <Modal.Body>
          <h5>Do you want to share your location</h5>
        </Modal.Body>
        </Modal.Header>
        <Button className=" modal-btn" onClick={()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position)    
        })
      }
      }>share</Button>{' '}
      {/* <Link to="../TextContainer/TextContainer.js"> <Button>Share</Button></Link> */}
      
        <Button className=" modal-btn" onClick={props.onHide}>Close</Button>
      </Modal>
    );
  }
  
  function Example() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button  className="LocButton"  onClick={() => setModalShow(true)}>
        <i class="bi bi-geo-alt-fill " ></i>
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false) }
          className={` ${modalShow ? "" : "hidden"}`}
        />      
      </>
    );
  }
  

  export default Example;  