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
//Images
import pinkChair from "../../images/pinkChair.jpg";

export default function RequestedItemCard(props) {
  const [currentRequestedItem, setCurrentRequestedItem] = React.useState();

  React.useEffect(() => {
    handleClick();
  }, []);

  //Go to item page
  async function handleClick() {
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/requesteditems/${props.id}`,
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
          image={pinkChair}
          alt="colorful paper"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.itemName.length < 13
              ? props.itemName
              : `${props.itemName.substring(0, 11)}...`}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{
              fontSize: "14px",
            }}
          >
            {props.city.split(",")[0]}
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
