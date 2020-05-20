type serverType = {
    host: string;
    port: number;
}

const server : serverType = { //@todo - define these vars from an .env file
    host: 'http://localhost',
    port: 8000
}

export {
    server
}