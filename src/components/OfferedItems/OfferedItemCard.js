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

export default function OfferedItemCard(props) {
  const [currentOfferedItem, setCurrentOfferedItem] = React.useState();
  let token = localStorage.getItem("shareItToken");

  React.useEffect(() => {
    handleClick();
  }, []);

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
        `${process.env.REACT_APP_SERVER_URL}/offereditems/${props.id}`,
        config
      );
      setCurrentOfferedItem(res.data.data[0]);
    } catch (err) {
      console.log({ error: err });
    }
  }
  return (
    <Card
      sx={{
        maxWidth: 345,
      }}
    >
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
            image={pinkChair}
            alt="colorful paper"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
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
      ) : (
        <CardActionArea onClick={showSignUpPrompt}>
          <CardMedia
            component="img"
            height="140"
            image={require("../../images/colorful-paper.jpeg")}
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
        </CardActionArea>
      )}
      {/* Button not currently in use
      <CardActions>
        <Button size="small" color="primary">
          Request Item
        </Button>
      </CardActions> */}
    </Card>
  );
}
