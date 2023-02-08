# TypeScript Node Express Boilerplate

This is a boilerplate project for typescript node express.

## Setup

### Environment

**For Linux**, ensure that your node has permission to listen on port 80. (OSX system do not need this)

    ```sh
    sudo apt-get install libcap2-bin
    sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
    ```

### Start

    ```sh
    npm install
    npm start
    ```

Open browser and visit http://127.0.0.1/status .
