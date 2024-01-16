import { useAppSelector } from "@/shared/redux/hooks";
import { selectWallet } from "@/shared/redux/wallet";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface IAddWalletModalProps {
  open: boolean;
  handleClose: () => void;
  coinName: string;
  price: number;
}

function calcCryptoBuy(
  coinValue: number,
  myMoneyInWallet: number
): boolean | string {
  if (
    isNaN(coinValue) ||
    isNaN(myMoneyInWallet) ||
    coinValue <= 0 ||
    myMoneyInWallet < 0
  ) {
    return false;
  }

  const quantidadeDeMoedas = myMoneyInWallet / coinValue;

  return quantidadeDeMoedas.toFixed(4);
}

export function AddWalletModal({
  handleClose,
  open,
  coinName,
  price,
}: IAddWalletModalProps) {
  const [coinAmount, setCoinAmount] = useState<string>("0");

  const money = useAppSelector(selectWallet);

  const [myMoney, setMyMoney] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const syncMoney = async () => {
      await setMyMoney(Number(money.money));
      const amout = calcCryptoBuy(price, myMoney);

      if (!amout) {
        return;
      }
      setCoinAmount(amout as string);
    };
    syncMoney();
  }, [money]);

  const handleAddToWallet = () => {
    handleClose();
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setQuantity(Number(value));
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box display="flex" justifyContent="center">
        <DialogTitle>Add in your Wallet</DialogTitle>
        <DialogTitle>You Have ${myMoney} in your wallet</DialogTitle>
      </Box>
      <DialogContent>
        <Box p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Coin Name"
                  fullWidth
                  value={coinName}
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Price"
                  fullWidth
                  value={price.toFixed(4)}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="quantity"
                  label="Quantity you will buy"
                  fullWidth
                  value={coinAmount}
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Back
        </Button>
        <Button onClick={handleAddToWallet} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
