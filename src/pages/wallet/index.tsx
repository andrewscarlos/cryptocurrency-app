import { Box, Paper, Typography } from "@mui/material";

function Wallet() {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">My Wallet</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Wallet;
