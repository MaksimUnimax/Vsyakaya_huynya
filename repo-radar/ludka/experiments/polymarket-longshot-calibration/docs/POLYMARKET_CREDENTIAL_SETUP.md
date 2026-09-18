# Polymarket credential setup for this experiment

Date checked: 2026-09-18

## Important distinction

The initial historical/calibration experiment uses **public market data and needs no credentials**.

Credentials are needed later for private account data and real forward order/fill verification.

There are several different Polymarket credentials; do not confuse them.

### 1. Polymarket account wallet / signer

Current Polymarket accounts use a Deposit Wallet by default for account wallets deployed on or after 2026-05-04. The account has a wallet address and a signer that controls it.

Never paste the signer private key into ChatGPT or commit it to Git.

### 2. Relayer API key from the web UI

For an existing Polymarket account:

1. Sign in at `polymarket.com`.
2. Open **Settings**.
3. Open **API Keys**.
4. Open **Relayer API Keys**.
5. Choose **Create**.
6. Copy and securely save the displayed **Signer Address** and **API Key**.

This key is for gasless wallet operations. It is not the same thing as the CLOB L2 `{apiKey, secret, passphrase}` credential set.

### 3. CLOB L2 credentials

Private CLOB requests use three L2 credentials:

- `apiKey`;
- `secret`;
- `passphrase`.

They are created/derived only after proving control of the signer with an L1 EIP-712 signature.

Official flow:

1. Create the `ClobAuth` typed-data message for Polygon chain id 137, using the signer address, current Unix timestamp and a nonce (normally `0`).
2. Sign that typed data with the signer that controls the address.
3. POST the signer address/signature/timestamp/nonce to `https://clob.polymarket.com/auth/api-key`, or call `GET /auth/derive-api-key` if credentials already exist for that address+nonce.
4. Save the returned `apiKey`, `secret` and `passphrase` in a local secret store.

Do **not** put the signer private key into the Polymarket Bridge v0.1.0. The first bridge is intentionally public-read-only.

### 4. Builder API keys are not our normal user key

The Polymarket **Settings -> Builders** credential set is for builder/integration accounts. It is not required for the initial public data experiment and should not be created merely to read markets.

### 5. Session keys

Session keys can give a separate signer limited trading access to a Deposit Wallet without withdrawal permission, which is attractive for a later real-order test. Current documentation describes the feature as beta and notes additional Builder authorization requirements during rollout. Therefore it is not part of bridge v0.1.0.

## Security policy for this repo

Never commit or paste:

- signer private keys;
- seed phrases;
- CLOB `secret`;
- CLOB `passphrase`;
- Builder secret/passphrase;
- browser cookies/session tokens.

When authenticated execution is introduced, secret handling gets a separate architecture and acceptance gate before any real order is enabled.
