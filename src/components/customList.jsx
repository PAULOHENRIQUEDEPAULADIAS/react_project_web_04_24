import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AppleIcon from '@mui/icons-material/Apple';
import GrainIcon from '@mui/icons-material/Grain';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LiquorIcon from '@mui/icons-material/Liquor';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';

import { useAppContext } from '../Context';

const CustomList = ({ items, ...props }) => {
    const navigate = useNavigate();
    const { translate } = useAppContext();

    const getIcon = (typeAction) => {
        switch (typeAction) {
            case 1:
                return <AppleIcon />;
            case 2:
                return <LocalGroceryStoreIcon />;
            case 3:
                return <GrainIcon />;
            case 4:
                return <RestaurantIcon />;
            case 5:
                return <IcecreamIcon />;
            case 6:
                return <CakeIcon />;
            case 7:
                return <KitchenIcon />;
            case 8:
                return <FastfoodIcon />;
            case 9:
                return <LiquorIcon />;
            case 10:
                return <TakeoutDiningIcon />;
            default:
                return <LocalOfferIcon />;
        }
    };

    const actionTypeListToInt = {
        1: "fruits",
        2: "vegetables",
        3: "dairy",
        4: "meat",
        5: "desserts",
        6: "baked goods",
        7: "cheese",
        8: "burgers",
        9: "drinks",
        10: "takeout",
    };

    const typeColor = {
        1: "#f44336", 
        2: "#4caf50", 
        3: "#ffeb3b", 
        4: "#f57c00", 
        5: "#e91e63", 
        6: "#9c27b0",
        7: "#ffeb3b",
        8: "#ff9800",
        9: "#3f51b5",
        10: "#4caf50",
    };

    return (
        <List {...props}>
            {
                items.map((item, index) => {
                    const typeStr = actionTypeListToInt[item.action_type];
                    return (
                        <ListItem
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: "60px",
                                marginTop: '1em',
                            }}
                            id={`new-item-list-${index}`}
                            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{ bgcolor: typeColor[item.action_type] }}
                                >
                                    {getIcon(item.action_type)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={translate(typeStr)}
                                secondary={item.subtitle}
                            />
                        </ListItem>
                    );
                })
            }
        </List>
    );
}

export default CustomList;
