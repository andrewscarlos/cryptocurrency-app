import { useAppSelector, useAppDispatch } from "@/shared/redux/hooks";
import { selectWallet, addMoney } from "@/shared/redux/wallet";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { GRID_INITIL_STATE } from "..";

function Wallet() {
  const dispatch = useAppDispatch();
  const money = useAppSelector(selectWallet);

  const [isFetching, setIsFetching] = useState(true);
  const [myMoney, setMyMoney] = useState(0);
  const [addAmount, setAddAmount] = useState("");
  const [currencies, setCurrencies] = useState<GridRowsProp>([]);

  useEffect(() => {
    setMyMoney(money.money);
    setCurrencies(money.cryptoCurrency);
    setIsFetching(false);
  }, [money]);

  console.log("currencies", money);
  const handleAddMoney = () => {
    const amounted = parseFloat(addAmount);
    if (!isNaN(amounted)) {
      dispatch(addMoney(amounted));
      setAddAmount("");
    }
    setAddAmount("");
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (!isNaN(Number(inputValue))) {
      setAddAmount(inputValue);
      return;
    }
    setAddAmount("");
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "coinName", headerName: "Name", flex: 1 },
    { field: "value", headerName: "Price", flex: 1 },
  ];
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            m={4}
          >
            <Typography variant="h3">My Wallet</Typography>
            <Typography variant="h5">
              You have ${myMoney} in your wallet
            </Typography>
          </Box>

          <Box p={2}>
            <Grid
              container
              spacing={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="column"
            >
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    label="Add Money"
                    variant="outlined"
                    type="text"
                    value={addAmount}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <Box display="flex" gap={2}>
                  <Button variant="contained" onClick={handleAddMoney}>
                    Add Money
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      {currencies.length > 0 && (
        <Box mt={5}>
          <DataGrid
            rows={currencies}
            columns={columns}
            initialState={GRID_INITIL_STATE}
            disableRowSelectionOnClick
            loading={isFetching}
          />
        </Box>
      )}
    </Box>
  );
}

export default Wallet;
