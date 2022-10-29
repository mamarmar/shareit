import * as React from "react";
import axios from "axios";
//React Router
import { Link } from "react-router-dom";
//MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function RequestedItemCard(props) {
  const [currentRequestedItem, setCurrentRequestedItem] = React.useState();
  
  React.useEffect(() => {
    handleClick();
  },[]);

  //Go to item page
  async function handleClick() {
    console.log(props.id)
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `https://shareitapplication.herokuapp.com/requesteditems/${props.id}`,
        config
      );
      setCurrentRequestedItem(res.data.data[0]);
    } catch (err) {
      console.log({ error: err });
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        component={CardActionArea}
        to={`/requested/${props.id}`}
        style={{ textDecoration: "none", color: "black" }}
        onClick={handleClick}
        state={currentRequestedItem}
      >
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
          <Typography gutterBottom variant="p" component="div">
            {props.city}
          </Typography>
        </CardContent>
      </Link>
      {/* Button not currently in use
      <CardActions>
        <Button size="small" color="primary">
          Offer Item
        </Button>
      </CardActions> */}
    </Card>
  );
}