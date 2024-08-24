# 🌴 IslandSwap Frontend

### Trello:

https://trello.com/b/ItnHvKTv/islandswap

<p align="center">
  <a href="https://islandswap.finance">
      <img src="https://islandswap.finance/logo.png" height="128">
  </a>
</p>

This project contains the main features of the pancake application.

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.

## Documentation

- [Info](doc/Info.md)
- [Cypress tests](doc/Cypress.md)

> Install dependencies using [pnpm](https://pnpm.io)

## `apps/web`

How to start

```sh
pnpm i
```

start the development server

```sh
pnpm dev
```

build with production mode

```sh
pnpm build

# start the application after build
pnpm start
```

## `apps/aptos`

How to start

```sh
pnpm dev:aptos
```

```sh
pnpm build:aptos
```

## `apps/blog`

How to start

```sh
pnpm dev:blog
```

```sh
pnpm build:blog
```

## `apps/games`

How to start

```sh
pnpm dev:games
```

```sh
pnpm build:games
```

## Packages

| Package                                    | Description                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| [sdk](/packages/swap-sdk)                  | An SDK for building applications on top of Pancakeswap                                                      |
| [aptos-swap-sdk](/packages/aptos-swap-sdk) | Aptos version of Swap SDK                                                                                   |
| [swap-sdk-core](/packages/swap-sdk-core)   | Swap SDK Shared code                                                                                        |
| [wagmi](/packages/wagmi)                   | Extension for [wagmi](https://github.com/wagmi-dev/wagmi), including bsc chain and binance wallet connector |
| [awgmi](/packages/awgmi)                   | Connect to Aptos with similar wagmi React hooks.                                                            |
| [smart-router](/packages/smart-router)     | An SDK for getting best trade routes.                                                                       |
| [multicall](/packages/multicall)           | Enhanced multicall sdk to safely make multicalls within the gas limit.                                      |
| [v3-sdk](/packages/v3-sdk)                 | An SDK for building applications on top of Pancakeswap V3.                                                  |
