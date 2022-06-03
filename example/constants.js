export const abi_sample = JSON.stringify({
  constant: false,
  inputs: [
    { name: "_to", type: "address" },
    { name: "_value", type: "uint256" },
  ],
  name: "transfer",
  outputs: [{ name: "success", type: "bool" }],
  payable: false,
  type: "function",
});

export const params_sample = JSON.stringify([
  "0xcad9042cf49684939a2f42c2d916d1b6526635c2",
  5000000000000000000,
]);

export const explorer_url = "https://testnetexplorer.metadium.com/tx/";
