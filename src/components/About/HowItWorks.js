import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CampaignIcon from '@mui/icons-material/Campaign';
import HandshakeIcon from "@mui/icons-material/Handshake";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
//React Router
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      icon: <AccountCircleRoundedIcon />,
      description:
        "Create a free account by filling in our sign up form. (shareit is free and always will be!)",
    },
    {
      id: 2,
      title: "Explore the Items",
      icon: <SearchRoundedIcon />,
      description:
        "Browse through the offered & requested items at a click of a button.",
    },
    {
      id: 3,
      title: "Contact other Users",
      icon: <EmailRoundedIcon />,
      description:
        "Found what you were looking for? Send a message to arrange a pickup.",
    },
    {
      id: 4,
      title: "Create a Listing",
      icon: <PostAddRoundedIcon />,
      description:
        "Couldn't find what you were looking for? Create your own listing.",
    },
  ];

  return (
    <Box
    id="top"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 5, md: 8 },
        mt: 10,
        mx: { xs: 5, sm: 10, md: 10 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          alignSelf: { xs: "center", md: "start" },
          fontSize: { xs: 40, md: 60 },
        }}
      >
        How it Works
      </Typography>
      <Grid container spacing={4}>
        {steps.map((step) => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <Box
                key={step.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  height: { xs: 200, sm: 270 },
                  bgcolor: "grey.300",
                  p: 2,
                  borderRadius: 1,
                }}
              >
                {step.icon}
                <Typography
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  {step.description}
                </Typography>
                <HashLink
                  to="/howitworks#details"
                  style={{
                    color: "#03A9F4",
                  }}
                >
                  More
                </HashLink>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Stack
        sx={{
          mt: 10,
          alignSelf: "start",
          minWidth: { xs: 300, sm: 540, md: 700, lg: 800, xl: 1000 },
        }}
      >
        <Typography
          variant="h3"
          id="details"
          sx={{
            fontSize: 30,
          }}
        >
          More Details
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HandshakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              Create a new account by filling in our sign up form. Signing up
              will give you access to all item listings. You will also be able
              to contact the users who have created these listings to request or
              offer an item.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HandshakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              Once you create an account, you will gain access to both offered
              and requested items by simply clicking the respective button that
              can be found on the navigation bar at the top. You can see all
              available items or filter the results according to what you are
              looking for.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HandshakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              If you find an item that you are interested in, you can contact
              the user who created the listing. You can send a message through
              shareit app directly to the user's email.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HandshakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              Once a user receives a message by you, they will be able to
              respond to the email you submitted when creating your account. You
              can arrange the details of the pickup through emails.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HandshakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              If you cannot find what you are looking for, you can create a new
              item listing, either to request an item or offer one. Once your
              listing is created, other users will be able to contact you as
              described above. Please make sure you check your mailbox for any
              messages about your items.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HandshakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              If you want to delete an item listing you have created, you can do
              so from the item's page.
            </ListItemText>
          </ListItem>
        </List>
        <HashLink
                  to="/howitworks#top"
                  style={{
                    color: "#03A9F4",
                  }}
                >
                  Back to top
                </HashLink>
      </Stack>
      <Stack direction="column"
        justifyContent="center"
        alignItems="center"
        color="grey.600"
      >
        <FavoriteIcon />
        <Typography
            sx={{
                textAlign:"center"
            }}
        >
            Share the word to expand our community & do your part in reducing your ecological foorprint, 
            in line with the first of the '3 Rs' of waste management (Reduce, Reuse, Recycle). 
            Sharing is caring & we care about our planet!
        </Typography>
      </Stack>
      
    </Box>
  );
}

export default HowItWorks;
