import React from "react";
import axios from "axios";
//Components
import RequestedItemCard from "../RequestedItems/RequestedItemCard";
import OfferedItemCard from "../OfferedItems/OfferedItemCard";
//React Router
import { useLocation } from "react-router-dom";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
//Image
import profilePic from "../../images/user-image.jpeg";

const UserProfile = () => {
    const cardSlider = React.useRef();
    const location = useLocation();

    const user = location.state;

    return (
            <Box
                fullWidth
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems:{xs:"center", md:"stretch"},
                  gap:5,
                  mt: 8,
                  mx: { xs: 3, md: 0 },
                  px: 3,
                }}
            >
                <Box
                    sx={{
                        maxWidth: 500,
                        minWidth: 320,
                        width:"50%"
                    }}
                >
                    <Stack
                        direction={{xs:"column", md:"row"}}
                        alignItems={{xs:"center",md:"end"}}
                        spacing={{xs:0, md:1}}
                    >
                        <Avatar
                            alt="user"
                            src={profilePic}
                            sx={{
                              width: {xs:80, md:100},
                              height: {xs:80, md:100},
                            }}
                        >
                        </Avatar>
                        <Stack
                            direction="column"
                            alignItems={{xs:"center", md:"start"}}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    mb:0,
                                    fontSize:{xs:28, md:32},
                                    fontWeight:500
                                }}
                            >
                                {user.firstName}
                            </Typography>
                            <Typography
                                variant="p"
                                sx={{
                                    color:{xs:"grey.500", md:"common.black"}
                                }}
                            >{user.city.split(",")[0]}, {user.country}</Typography>
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        width:{xs:360, md:"50%"},
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        gap:2,
                        mx:3
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize:{xs:24, md:30}
                        }}
                    >{user.firstName}'s Items</Typography>
                    <Stack
                        direction="column"
                        spacing={2}
                    >
                        {user.itemsBorrowed.length > 0 && 
                        <Stack
                        direction="column"
                        spacing={1}
                        alignItems={{xs:"center", md:"start"}}
                        
                        >
                            <Typography
                                sx={{
                                    color:"grey.500"
                                }}
                            >{user.firstName} has requested</Typography>
                            <Stack
                                direction="row"
                                justifyContent={{xs:"center", md:"start"}}
                                spacing={2}
                                sx={{
                                    overflowX:"scroll",
                                    webkitOverflowScrolling: "touch"
                                }}
                            >
                            {user.itemsBorrowed.map(item=> {
                            return <Box
                                        sx={{
                                            flexBasis:"25%",
                                            flexShrink:0,
                                        }}  
                                    >
                                        <RequestedItemCard 
                                        className="slider-item"
                                        key={item._id}
                                        id={item._id}
                                        itemName={item.itemName}
                                        city={item.city}
                                        itemImages={item.itemImages}
                                    />

                                    </Box>
                        })}
                            </Stack>
                        </Stack>}
                        {user.itemsLent.length > 0 &&
                        <Stack
                            spacing={1}
                            alignItems={{xs:"center", md:"start"}}
                        >
                            <Typography
                                sx={{
                                    color:"grey.500"
                                }}
                            >{user.firstName} is offering</Typography>
                            <Stack
                                direction="row"
                                justifyContent={{xs:"center", md:"start"}}
                                spacing={2}
                                sx={{
                                    overflowX:"scroll",
                                    webkitOverflowScrolling: "touch"
                                }}
                            >
                            {user.itemsLent.map(item=> {
                            return <Box
                                        sx={{
                                            flexBasis:"25%",
                                            flexShrink:0,
                                        }}
                                    >
                                    <OfferedItemCard 
                                        className="slider-item"
                                        key={item._id}
                                        id={item._id}
                                        itemName={item.itemName}
                                        city={item.city}
                                        itemImages={item.itemImages}
                                    />
                                    </Box>
                        })}
                            </Stack>
                        </Stack>
                        }
                    </Stack>
                </Box>
            </Box>
    )
}

export default UserProfile;