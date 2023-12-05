import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion"
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box height="100%">
      <FlexBetween
        width="100%"
        backgroundColor={theme.palette.nav.background}
        sx={isNonMobileScreens ? { position: "absolute" } : null}>
        <Box
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" variant="h2" color={isNonMobileScreens ? "nav.logo" : null}>
            Puppy Island
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween height="100%" backgroundColor={theme.palette.primary.light}>
        <img
          style={{ objectFit: "cover" }}
          width={isNonMobileScreens ? "60%" : "0%"}
          position={isNonMobileScreens ? null : "absolute"}
          height="100%"
          alt="user"
          src="../assets/bichon.jpg"
        />
        <Box
          display="flex"
          justifyContent="center"
          width={isNonMobileScreens ? "40%" : "100%"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              p="2rem"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              <Typography fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }}>
                Join the wonderland for puppy enthusiasts for free!
              </Typography>
              <Form></Form>
            </Box>
          </motion.div>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default LoginPage;
