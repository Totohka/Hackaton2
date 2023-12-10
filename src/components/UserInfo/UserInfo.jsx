import './UserInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import logo from './../Sidebar/img/edit.svg';
const UserInfo = (props) =>{
    return(
        <div className='UserInfo'>
            <div className='res' >Ник:</div>
            <div className='info'>{props.info.firstName} {props.info.lastName}</div>
            <button className='frame'><img src={logo}/></button>
        </div>
    );
}
export default UserInfo;