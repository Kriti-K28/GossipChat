import React ,{useState}from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Do you want to share your location</h5>
        </Modal.Body>
        
        <button onClick={()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position)    
        })
      }
      }>share</button>
     
        <Button onClick={props.onHide}>Close</Button>
      </Modal>
    );
  }
  
  function Example() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Share Location
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}

        />      
      </>
    );
  }
  

  export default Example;  