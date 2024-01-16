import { useAppSelector, useAppDispatch } from "@/shared/redux/hooks";
import { selectWallet, addMoney } from "@/shared/redux/wallet";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function Wallet() {
  const dispatch = useAppDispatch();
  const money = useAppSelector(selectWallet);

  const [myMoney, setMyMoney] = useState(0);
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    setMyMoney(money.money);
  }, [money]);

  const handleAddMoney = () => {
    const amountToAdd = parseFloat(addAmount);
    if (!isNaN(amountToAdd)) {
      dispatch(addMoney(amountToAdd));
      setAddAmount("");
    }
  };

  return (
    <Box>
      <Paper>
        <Box
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h3">My Wallet</Typography>
            <Typography variant="h5">
              You have ${myMoney} in your wallet
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              label="Add Money"
              variant="outlined"
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              InputProps={{
                inputProps: { min: 0, style: { textAlign: "right" } },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMoney}
              style={{ marginLeft: 8 }}
            >
              Add Money
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Wallet;
