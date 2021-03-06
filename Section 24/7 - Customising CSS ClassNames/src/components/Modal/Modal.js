import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import './Modal.css';

const animationTiming = {
    enter: 400,
    exit: 1000
};

const modal = (props) => {
    
    return (
        // <CSSTransition classNames='fade-slide' in={props.show} timeout={animationTiming} mountOnEnter unmountOnExit>
        <CSSTransition classNames={{ enter: '', enterActive: 'ModalOpen', exit: '', exitActive: 'ModalClosed' }} in={props.show} timeout={animationTiming} mountOnEnter unmountOnExit>
            <div className='Modal'>
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>Dismiss</button>
            </div>


            
        </CSSTransition>
    );
};

export default modal;