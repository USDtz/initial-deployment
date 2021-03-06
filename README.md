# USDtz deployment script

This is the code that was used to deploy the current version of the USDtz token on the Tezos blockchain at [KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9](https://mininax.io/mainnet/accounts/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9). The script is based on [ConseilJS](https://github.com/Cryptonomic/ConseilJS) and was run with [Nautilus Cloud](https://nautilus.cloud) infrastructure.

## Steps

The script is fairly manual, there are 5 steps, each of which entails a re-build and re-run once the prior step has completed. The script consumed roughly 7 XTZ as fees. Initial setup is just the package installation with `npm i`.

### 1

This step will reveal the account on the chain once it has received seed funding, which in the case of the initial deployment was 10 XTZ.

In the `run()` method uncomment the line below "step 1", then run the following: `npm run build && npm start`.

### 2

Step 2 deploys the token contract which is the [vanilla implementation](https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-7/ManagedLedger.tz) of the FA1.2 token defined in [TZIP7 proposal](https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-7/ManagedLedger.md) using [ConseilJS](https://github.com/Cryptonomic/ConseilJS/blob/master/src/chain/tezos/contracts/Tzip7ReferenceTokenHelper.ts).

In the `run()` method disable the code from step 1 uncomment the line below "step 2", then run the following: `npm run build && npm start`.

### 3

[Step 3](https://mininax.io/mainnet/operations/onmtdGSe3ZPQ1fuQGe136zpz7YrAUDF7YMRJK9h6wyA4vkq1PdD) activates the token contract so that it may execute operations such as balance transfers.

In the `run()` method disable the code from step 2 uncomment the line below "step 3", then run the following: `npm run build && npm start`.

### 4

[Step 4](https://mininax.io/mainnet/operations/oo9tqwMhfdVdNKVwjU3irfU1RbnfPihqBBRTw4stkdTK2qNVWTn) `mint`s a minimum balance to the final token admin. This step is necessary due to a limitation on Galleon Preview 1.1.1b wallet where the software will not allow UI-based interactions with the token contract unless the loaded account has a balance in that ledger. This step mints "1" which is interpreted as 0.000001 USDtz, effectively 1 micro-dollar.

In the `run()` method disable the code from step 3 uncomment the line below "step 4", then run the following: `npm run build && npm start`.

### 5

[Step 5](https://mininax.io/mainnet/operations/oo5jVfJmDbcndU8aKy5rzzMsAKDu9R9o598MUU3n6er2apMdBGk) transfers ownership of the contract to the destination account. This was the address designated by [StableTez](https://stabletez.com/). Once this operation completes the initial deployment account loses control of the contract.

In the `run()` method disable the code from step 4 uncomment the line below "step 5", then run the following: `npm run build && npm start`.

## USDtz support

### Wallets

Currently, the following wallets allow USDtz interactions for balance holders.

- [Galleon Preview 1.1.2b](https://github.com/Cryptonomic/Deployments/wiki/Galleon:-Releases#version-112b-may-14-2020) by [Cryptonomic Inc](https://cryptonomic.tech/).
- [Thanos Wallet](https://thanoswallet.com)

Additionally, administration functions are supported by:

- [Galleon Preview 1.1.2b](https://github.com/Cryptonomic/Deployments/wiki/Galleon:-Releases#version-112b-may-14-2020) by [Cryptonomic Inc](https://cryptonomic.tech/).

### Block explorers

View [USDtz operations](https://arronax.io/tezos/mainnet/operations/query/eyJmaWVsZHMiOlsidGltZXN0YW1wIiwiYmxvY2tfbGV2ZWwiLCJzb3VyY2UiLCJkZXN0aW5hdGlvbiIsImZlZSIsInBhcmFtZXRlcnMiXSwicHJlZGljYXRlcyI6W3siZmllbGQiOiJkZXN0aW5hdGlvbiIsIm9wZXJhdGlvbiI6ImVxIiwic2V0IjpbIktUMUxONExQU3FUTVM3U2QyQ0p3NGJiREdSa012MnQ2OEZ5OSJdLCJpbnZlcnNlIjpmYWxzZX0seyJmaWVsZCI6ImtpbmQiLCJvcGVyYXRpb24iOiJlcSIsInNldCI6WyJ0cmFuc2FjdGlvbiJdLCJpbnZlcnNlIjpmYWxzZX0seyJmaWVsZCI6InN0YXR1cyIsIm9wZXJhdGlvbiI6ImVxIiwic2V0IjpbImFwcGxpZWQiXSwiaW52ZXJzZSI6ZmFsc2V9XSwib3JkZXJCeSI6W3siZmllbGQiOiJ0aW1lc3RhbXAiLCJkaXJlY3Rpb24iOiJkZXNjIn1dLCJhZ2dyZWdhdGlvbiI6W10sImxpbWl0IjoxMDAwfQ) on Arronax.

See USDtz on the various Tezos block explorers.

- [TezBlock](https://tezblock.io/contract/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9)
- [Better Call Dev](https://better-call.dev/mainnet/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9/operations)
- [TzStats](https://tzstats.com/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9)
- [TzKt](https://tzkt.io/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9/operations)
- [Mininax](https://mininax.io/mainnet/accounts/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9)
- [Arronax](https://arronax.io/tezos/mainnet/accounts/KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9)
