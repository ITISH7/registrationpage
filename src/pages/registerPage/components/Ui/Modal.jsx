import classes from'./Modal.module.css';
import ReactDOM from 'react-dom';
const Backdrop =(props)=>{
    return(<div className ={classes.backdrop} onClick = {props.hideCard}></div>)
};
const Modaloverlay=props=>{
    return(<div className={classes.modal}>
        <div  className={classes.content}>{props.children}</div>
    </div>)
}
const Modal=(props)=>{
    const getElement = document.getElementById('overlay');
    return(
        <>
        {ReactDOM.createPortal(<Backdrop hideCard = {props.hideCard}/>,getElement)}
        {ReactDOM.createPortal(<Modaloverlay>{props.children}</Modaloverlay>,getElement)}
        </>
    );
}
export default Modal;