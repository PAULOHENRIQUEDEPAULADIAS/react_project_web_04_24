import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Card, Fab, Grid, Typography } from '.';
import { useAppContext } from '../context';

const CardNewItemComponent = ({ Icon, color, title, actionType, isEmpty, handleClick }) => {
    const navigate = useNavigate();
    //const { translate } = useAppContext();

    return (
        <Card
            sx={{
                overflow: 'visible',
                borderRadius: '10%',
                width: '100px',
                maxWidth: '100%',
                margin: 0,
            }}
        >
            {isEmpty ? (
                // Renderizar apenas o grid vazio e o botão de adição
                <Grid
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100px', // Altura para alinhar visualmente
                    }}
                >
                    <Fab
                        size="small"
                        sx={{
                            color: color || '#000',
                            backgroundColor: "#fff",
                            position: 'relative',
                        }}
                        onClick={handleClick}
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
            ) : (
                // Renderizar o conteúdo padrão (Icon, título, descrição)
                <>
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            sx={{
                                marginTop: '.2em',
                                fontSize: '3em',
                                color: color,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: '.80em',
                                marginTop: '0.5em',
                                fontWeight: '700',
                                textAlign: 'center',
                                wordWrap: 'break-word',
                                width: '90%',
                            }}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                marginTop: '0.5em',
                                fontSize: '0.8em',
                                fontWeight: '400',
                                color: '#8f8f8f',
                            }}
                        >
                        </Typography>
                    </Grid>
                </>
            )}
        </Card>
    );
};

export default CardNewItemComponent;
