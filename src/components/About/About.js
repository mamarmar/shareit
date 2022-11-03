//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function About() {
    return (
        <Box
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
        About
      </Typography>
        </Box>
    );
}

export default About;