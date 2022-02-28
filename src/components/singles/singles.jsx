import './singles.scss';
import { Button, ListItem, Skeleton, CircularProgress } from '@mui/material';
import { List } from '@mui/material';

const Singles = ({ singlesList, singlesLoading, singlesError, getSingles }) => {

    const singlesListRender = singlesList.map(el => {
        return (
            <ListItem sx={{ width: 'auto' }} className="singles-list__item" disablePadding key={el.id}>
                {(singlesLoading) === 1 ?
                    <Skeleton animation="wave" variant="rectangular" width={223} height={310} />
                    : <img src={el.imageUrl} alt={el.name} width={223} height={310} />}
            </ListItem>
        )
    });

    return (
        <div className="singles">
            <h2>Magic: The Gathering singles</h2>

            {singlesLoading === 1 ? <CircularProgress /> : <Button style={{ width: '130px', height: '30px' }} onClick={getSingles}>Refresh singles list</Button>}

            {singlesError ? <div>Error! Try again later</div> : <List className="singles-list">
                {singlesListRender}
            </List>}

        </div>
    )
}
export default Singles;