# Staking Pools

This is a React project for staking pools, where users can stake their tokens to receive hourly rewards. The project also includes authentication with a backend server to set a name and email for the user's wallet.

## Features

- Staking in Pools: Users can stake their tokens in various pools to earn hourly rewards based on their staked amount.
- Authentication: Users can authenticate with the backend server to set a custom name and email for their wallet.


## Installation

1. Clone the repository:
2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## Configuration

Before running the project, make sure to configure the backend server URL and factory address in the project.

1. Open the `.env` file.

2. Update the `REACT_APP_API_URL` and `REACT_APP_FACTORY_ADDRESS` variables:

   ```
   REACT_APP_API_URL=...
   REACT_APP_FACTORY_ADDRESS=...
   ```

## Usage

To start the development server, use the following command:

```bash
yarn start
```

The application will be accessible at `http://localhost:3000` in your web browser.

## Licence

Copyright (c) 2023 Aidas Jankauskas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
