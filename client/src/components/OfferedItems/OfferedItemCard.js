import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function OfferedItemCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={require("../../images/colorful-paper.jpeg")}
          alt="colorful paper"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.itemName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Request Item
        </Button>
      </CardActions>
    </Card>
  );
}