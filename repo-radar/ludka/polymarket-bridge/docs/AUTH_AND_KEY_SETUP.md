# Authentication and key setup

Date checked: 2026-09-18

## v0.1.0 needs no key

The bridge's current operations are public market-data reads. Polymarket documents public market data as available without credentials.

## Existing Polymarket account: UI key

1. Sign in to `polymarket.com`.
2. Open **Settings -> API Keys -> Relayer API Keys**.
3. Create a Relayer API key.
4. Save the displayed **Signer Address** and **API Key** securely.

This Relayer key authorizes gasless wallet operations. It is not the same as CLOB L2 credentials.

## CLOB L2 credentials

Private CLOB requests require `{apiKey, secret, passphrase}` plus the signer address. To create/derive them, the signer must first produce Polymarket's L1 EIP-712 `ClobAuth` signature.

Official endpoints:

- create: `POST https://clob.polymarket.com/auth/api-key`
- derive existing: `GET https://clob.polymarket.com/auth/derive-api-key`

L1 headers:

- `POLY_ADDRESS`
- `POLY_SIGNATURE`
- `POLY_TIMESTAMP`
- `POLY_NONCE`

The returned values are:

- `apiKey`
- `secret`
- `passphrase`

Authenticated L2 requests additionally send an HMAC signature in `POLY_SIGNATURE`.

## Trading requires more than the L2 key

Order placement uses L2 authentication **and a wallet signature for the order itself**. Therefore a future trading bridge needs a deliberate signer architecture; merely pasting API credentials into an extension is not enough and is not accepted here.

## Never share

Never paste into ChatGPT or Git:

- seed phrase;
- signer private key;
- CLOB secret/passphrase;
- Builder secret/passphrase;
- browser cookies.
