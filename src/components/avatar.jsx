import { Avatar } from '@mui/material';
import Logo from "../img/logo.png";

const AvatarComponent = (props) => {
  return <Avatar 
    {...props}
    src={Logo}
    alt={props.altText}
    sx={{
      width: 200, 
      height: 200,
      backgroundColor: 'gray',
      border: '2px solid black',
    }}
    />;
}

export default AvatarComponent;

