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

export default function OfferedItemCard(props) {
  const [currentOfferedItem, setCurrentOfferedItem] = React.useState();
  let token = localStorage.getItem("shareItToken");

  function showSignUpPrompt() {
    props.setShowSignUpPrompt(true);
  }

  //Go to item page
  async function handleClick() {
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/offereditems/${props.id}`,
        config
      );
      setCurrentOfferedItem(res.data.data[0]);
    } catch (err) {
      console.log({ error: err });
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      {token ? (
        <Link
          component={CardActionArea}
          to={`/offered/${props.id}`}
          style={{ textDecoration: "none", color: "black" }}
          onClick={handleClick}
          state={currentOfferedItem}
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
          </CardContent>
        </Link>
      ) : (
        <CardActionArea onClick={showSignUpPrompt} state={currentOfferedItem}>
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
      )}
      <CardActions>
        <Button size="small" color="primary">
          Request Item
        </Button>
      </CardActions>
    </Card>
  );
}
