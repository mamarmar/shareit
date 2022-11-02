import React from 'react';
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
    //Container of image carousel and image thumbnails
    <Box
      sx={{
        display:"flex",
        flexDirection:{xs: "column", md:"row"},
        justifyContent:"space-between",
        gap:{xs:3, md:2}
      }}
    >
      {/* Image Carousel */}
      <Box
        sx={{ 
          backgroundImage:`url(${images[currImg].path})`,
          backgroundSize: "cover",
          backgroundPosition:"center",
          backgroundRepeat:"no-repeat",
          width:{xs:"100%", md:"80%"},
          height:{xs:240, md:320},
          borderRadius:1,
          display:"flex",
          
        }}
      >
        {currImg !== 0 && <Box
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
          sx= {{
            flex:"5%",
            height:"100%",
            backgroundColor: "rgb(0,0,0, .2)",
            display:"flex",
            alignItems:"center",
            cursor:"pointer"
            
          }}
        >
          <ArrowBackIosIcon 
            sx={{ 
              fontSize: 30,
              color:"common.white" ,
            }} 
          />
        </Box>}
        <Box
          sx={{
            flex:"90%",
          }}
        >
        </Box>
        {currImg !== images.length-1 && <Box
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
          sx= {{
            flex:"5%",
            height:"100%",
            backgroundColor: "rgb(0,0,0, .2)",
            display:"flex",
            alignItems:"center",
            cursor:"pointer"
          }}
        >
          <ArrowForwardIosIcon 
            sx={{ 
              fontSize: 30,
              color:"common.white",
              
            }} 
          />
        </Box>}
      </Box>
      {/* Image thumbnail container */}
      <Box
        sx={{
          borderRadius:1,
          width: {xs:"100%", md:"20%"},
          height: {xs:60, md:320},
          display:"flex",
          flexDirection:{xs: "row", md:"column"},
          gap:2,
          overflowX: "scroll",
        }}
      >
        {images.map(item => {
          return <Box
            key={item.id}
            sx={{
              backgroundImage:`url(${item.path})`,
              backgroundSize: "cover",
              backgroundPosition:"center",
              backgroundRepeat:"no-repeat",
              height:100,
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