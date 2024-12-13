import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AppleIcon from '@mui/icons-material/Apple';
import GrainIcon from '@mui/icons-material/Grain';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import LiquorIcon from '@mui/icons-material/Liquor';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';

const ACTIONS = [
    {
        title: 'fruits', 
        actionType: 1,
        Icon: AppleIcon,
        color: '#f44336' 
    },
    {
        title: 'vegetables', 
        actionType: 2,
        Icon: LocalGroceryStoreIcon,
        color: '#4caf50' 
    },
    {
        title: 'dairy',
        actionType: 3,
        Icon: GrainIcon,
        color: '#ffeb3b'
    },
    {
        title: 'meat',
        actionType: 4,
        Icon: RestaurantIcon,
        color: '#f57c00'
    },
    {
        title: 'desserts', 
        actionType: 5,
        Icon: IcecreamIcon,
        color: '#e91e63' 
    },
    {
        title: 'baked goods', 
        actionType: 6,
        Icon: CakeIcon,
        color: '#9c27b0'  
    },
    {
        title: 'cheese',  
        actionType: 7,
        Icon: KitchenIcon,
        color: '#ffeb3b'  
    },
    {
        title: 'burgers',  
        actionType: 8,
        Icon: FastfoodIcon,
        color: '#ff9800' 
        },
    {
        title: 'drinks', 
        actionType: 9,
        Icon: LiquorIcon,
        color: '#3f51b5' 
    },
    {
        title: 'takeout',
        actionType: 10,
        Icon: TakeoutDiningIcon,
        color: '#4caf50' 
    }
]

export {
    ACTIONS
}