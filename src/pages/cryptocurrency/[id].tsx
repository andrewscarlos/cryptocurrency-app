import { useGetCryptoAssetsByIdQuery } from "@/shared/redux/cryptocurrency";
import { CryptoCurrencyDetails } from "@/shared/types/CryptoCurrency.details";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CryptocurrencyDetails() {
  const router = useRouter();
  const id = (router.query.id as string) || "";
  const { data, isFetching, isSuccess } = useGetCryptoAssetsByIdQuery({ id });

  const [cryptoCurrencyDetails, setCryptoCurrencyDetails] =
    useState<CryptoCurrencyDetails>({
      name: "",
      symbol: "",
      category: "",
      description: "",
      slug: "",
      logo: "",
      subreddit: "",
      notice: "",
      tags: [""],
      "tag-groups": [""],
      "tag-names": [""],
      contract_address: [],
      date_added: "",
      date_launched: "",
      id: 0,
      infinite_supply: false,
      is_hidden: 0,
      platform: "",
      twitter_username: "",
    });

  useEffect(() => {
    if (data?.data) {
      setCryptoCurrencyDetails(data?.data[id]);
    }
  }, [data]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Crypto Details</Typography>
          </Box>
        </Box>
        <Box p={2}>
          {isFetching && <CircularProgress />}
          {isSuccess && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Image
                  width={64}
                  height={64}
                  src={cryptoCurrencyDetails?.logo}
                  alt="currency imgs"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="id"
                    label="Id"
                    value={cryptoCurrencyDetails?.id}
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    label="Name"
                    value={cryptoCurrencyDetails?.name}
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="symbol"
                    label="Symbol"
                    value={cryptoCurrencyDetails?.symbol}
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="category"
                    label="Category"
                    value={cryptoCurrencyDetails?.category}
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="slug"
                    label="Slug"
                    value={cryptoCurrencyDetails?.slug}
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="subreddit"
                    label="Subreddit"
                    value={cryptoCurrencyDetails?.subreddit}
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/cryptocurrency")}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
export default CryptocurrencyDetails;
