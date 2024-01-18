import React from "react";
import { useGetCryptoAssetsQuery } from "@/shared/redux/cryptocurrency";
import { ICryuptoCurrency } from "@/shared/types/CryptoAsset";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { AddWalletModal } from "@/components/AddWalletModal";

const SLOTS_PROPS = {
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
};

const SLOTS = {
  toolbar: GridToolbar,
};

const ROWS_PER_PAGE = [10, 25, 50, 100];

const convertData = (data: ICryuptoCurrency[]) =>
  data.map((el, index) => {
    return {
      name: el.name,
      id: el.id,
      symbol: el.symbol,
      slug: el.slug,
      dateAdded: new Date(el.date_added).toLocaleDateString("pt-BR"),
      lastUpdate: new Date(el.last_updated).toLocaleDateString("pt-BR"),
      index: index,
      price: el.quote["USD"].price,
    };
  });

function CryptocurrencyList() {
  const router = useRouter();
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const { data, isFetching } = useGetCryptoAssetsQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [coinName, setCoinName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  function handleClose() {
    setOpen(!open);
  }
  const rows: GridRowsProp = data?.data ? convertData(data.data) : [];

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <>
        <Tooltip title="Datails" arrow>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => router.push(`/cryptocurrency/${row.id}`)}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add on your Wallet" arrow>
          <IconButton
            color="secondary"
            aria-label="Add Wallet"
            onClick={() => {
              setCoinName(row.row.name);
              setPrice(row.row.price);
              handleClose();
            }}
          >
            <AddCardIcon />
          </IconButton>
        </Tooltip>

        {open && (
          <AddWalletModal
            handleClose={handleClose}
            open={open}
            coinName={coinName}
            price={price}
          />
        )}
      </>
    );
  }
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "dateAdded", headerName: "Add At", flex: 1 },
    { field: "lastUpdate", headerName: "Updated At", flex: 1 },
    { field: "slug", headerName: "Slug", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 1 },
    {
      field: "index",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  const GRID_INITIL_STATE = {
    pagination: {
      paginationModel: { pageSize: pagination.pageSize, page: pagination.page },
    },
  };

  function handleOnPageChange(paginationModel: GridPaginationModel) {
    setPagination({
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    });
  }

  const rowCount = rows.length || 0;
  return (
    <Box sx={{ display: "flex", height: 700 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={SLOTS}
        slotProps={SLOTS_PROPS}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        disableColumnMenu
        initialState={GRID_INITIL_STATE}
        onPaginationModelChange={handleOnPageChange}
        rowCount={rowCount}
        pageSizeOptions={ROWS_PER_PAGE}
        loading={isFetching}
      />
    </Box>
  );
}

export default CryptocurrencyList;
