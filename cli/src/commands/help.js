module.exports = ui => function* () {
    const { bold, dim, gray, cyan } = ui.colors;

    ui.print(`
    ${bold('comfy')} [command] <options>

    ${dim('Commands')}
        help        Show this very help message
        init        Initialize ${bold('comfy')} for this repository and help you to configure it
        env         Manage your project environments
        ls          List all configurations
        add         Add a new configuration
        get         Retrieve a configuration

    ${dim('Examples:')}
        ${gray('-')} Display the help
            ${cyan('comfy help')}
        ${gray('-')} List the environments
            ${cyan('comfy env ls')}
        ${gray('-')} List all available configurations
            ${cyan('comfy ls production')}
        ${gray('-')} Add a new configuration
            ${cyan('comfy add development -f /config/api.json')}
        ${gray('-')} Retrieve the latest staging stable configuration
            ${cyan('comfy get staging')}

    ${dim('About')}
        ${bold('comfy')} is licensed under the MIT Licence, sponsored and supported by marmelab.
        ${gray('-')} ${cyan('https://marmelab.com')}
`);
    ui.exit(0);
};
