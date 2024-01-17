import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { addCryptoCurrency, selectWallet } from "@/shared/redux/wallet";
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
import { useSnackbar } from "notistack";
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
  const money = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();
  
  const { enqueueSnackbar } = useSnackbar();
  const [coinValue, setCoinValue] = useState<string>("");
  const [myMoneyInWallet, setMyMoneyInWallet] = useState<number>(0);
  const [coinToBuy, setCoinToBuy] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const syncMoney = async () => {
      await setMyMoneyInWallet(Number(money.money));
      const amount = calcCryptoBuy(price, myMoneyInWallet);
      if (!amount) {
        return;
      }
      setCoinToBuy(amount.toString());
      setCoinValue(price.toFixed(4).toString());
    };
    syncMoney();
  }, [money, price, myMoneyInWallet]);

  const handleAddToWallet = () => {
    enqueueSnackbar(`${coinName} Adicionado a carteira com sucesso`, {
      variant: "success",
    });
    dispatch(
      addCryptoCurrency({
        coinName,
        value: myMoneyInWallet,
      })
    );
    handleClose();
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      const totalCost = numericValue * Number(coinValue);

      if (totalCost <= myMoneyInWallet) {
        setIsError(false);
        setCoinToBuy(numericValue.toString());

        const updatedMoneyInWallet = myMoneyInWallet - totalCost;
        setMyMoneyInWallet(updatedMoneyInWallet);

        return;
      }

      setIsError(true);
      enqueueSnackbar(
        "Saldo insuficiente. Você não possui dinheiro suficiente para comprar essa quantidade de criptomoeda.",
        { variant: "error" }
      );

      return;
    }

    setIsError(true);
    enqueueSnackbar(
      "Entrada inválida. Insira um valor numérico não negativo.",
      { variant: "error" }
    );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box display="flex" justifyContent="center">
        <DialogTitle>Add in your Wallet</DialogTitle>
        <DialogTitle>You Have ${myMoneyInWallet} in your wallet</DialogTitle>
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
                  value={coinToBuy}
                  onChange={handleChange}
                  type="number"
                  error={isError}
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
        <Button
          onClick={handleAddToWallet}
          variant="contained"
          disabled={isError}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
