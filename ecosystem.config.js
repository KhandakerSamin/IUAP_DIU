module.exports = {
    apps: [
        {
            name: 'iaup',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            cwd: '/var/www/IUAP_DIU',
            instances: 'max',
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};