//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//React Router
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {xs:"center", md:"start"},
            gap: 2,
            mt: 10,
            mx: { xs: 5, sm: 10, md: 10 },
          }}
        >
            <Typography
        variant="h1"
        sx={{
          alignSelf: { xs: "center", md: "start" },
          fontSize: { xs: 40, md: 50 },
          textAlign:{xs:"center", md:"left"}
        }}
      >
        404 Error. This page does not exist.
      </Typography>
      <Link 
        tp="/"
        style={{
            color:"#03A9F4"
        }}>
        <Typography 
            sx={{
                fontSize:18
            }}
        >Back to Home</Typography>
      </Link>
      
        </Box>
    );
}

export default ErrorPage;