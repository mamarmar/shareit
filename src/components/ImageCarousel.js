import React, { useState } from 'react';
//Bootstrap
// import Carousel from 'react-bootstrap/Carousel';
import pinkChair from "../images/pinkChair.jpg";
import redChair from "../images/redChair.jpg";
import whiteChair from "../images/whiteChair.jpg";
import blueChair from "../images/blueChair.jpg";
//MUI
import Box from "@mui/material/Box";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForward';

function ImageCarousel() {
  const [currImg, setCurrImg] = React.useState(0);
  const images= [
    {
        path: pinkChair,
        id:1
    },
    {
        path: whiteChair,
        id:2
    },
    {
        path: blueChair,
        id:3
    },
    {
        path: redChair,
        id:4
    }
  ];

  return (
    <Box
      sx={{
        display:"flex",
        flexDirection:{xs: "column", md:"row"},
        justifyContent:"space-between",
        gap:2
      }}
    >
      <Box
        className="carouselInner"
        sx={{ 
          backgroundImage:`url(${images[currImg].path})`,
          backgroundSize: "cover",
          backgroundPosition:"center",
          backgroundRepeat:"no-repeat",
          width:{xs:"100%", md:"80%"},
          height:{xs:320},
          borderRadius:1,
          display:"flex"
        }}
      >
        <Box
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
          sx= {{
            flex:"5%",
            height:"100%",
            backgroundColor: "rgb(0,0,0, .2)",
            display:"flex",
            alignItems:"center",
            
          }}
        >
          <ArrowBackIosIcon 
            sx={{ 
              fontSize: 30,
              color:"common.white" ,
              cursor:"pointer"
            }} 
          />
        </Box>
        <Box
          sx={{
            flex:"90%"
          }}
        >
        </Box>
        <Box
          className="right"
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
          sx= {{
            flex:"5%",
            height:"100%",
            backgroundColor: "rgb(0,0,0, .2)",
            display:"flex",
            alignItems:"center"
          }}
        >
          <ArrowForwardIosIcon 
            sx={{ 
              fontSize: 30,
              color:"common.white",
              cursor:"pointer"
            }} 
          />
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius:1,
          width: {xs:"100%", md:"20%"},
          height: {xs:100, md:320},
          display:"flex",
          flexDirection:{xs: "row", md:"column"},
          gap:2,
          overflow:"hidden"
        }}
      >
        {images.map(image => {
          return <Box
            key={image.id}
            sx={{
              backgroundImage:`url(${image.path})`,
              backgroundSize: "cover",
              backgroundPosition:"center",
              backgroundRepeat:"no-repeat",
              height:120,
              width:"100%",
              borderRadius:1
            }}
          >
          </Box>
        })}
      </Box>
    </Box>
  );
}

export default ImageCarousel;