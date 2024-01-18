import React from "react";
import { render, screen } from "@testing-library/react";
import { AddWalletModal } from "./AddWalletModal";

describe("MeuComponente", () => {
  it("renderiza corretamente", () => {
    render(
      <AddWalletModal
        coinName="Bitcoin"
        handleClose={() => {}}
        open
        price={100}
      />
    );
    expect(screen.getByText("Bitcoin")).toBeTruthy();
  });
});
