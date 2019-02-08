const minimist = require('minimist');

const help = (ui) => {
    const { bold, cyan } = ui.colors;

    ui.print(`
${bold('NAME')}
        comfy set - Replace a subset of an existing configuration

${bold('SYNOPSIS')}
        ${bold('comfy')} set <environment> <selector> <value> [<options>]

${bold('OPTIONS')}
        <environment>     Name of the environment (must already exist in project)
        <selector>        Select the subset of the config (dot separated)
        <value>           The replacement value
        -t, --tag=<tag>   Set a tag for this config version (default: stable)
        -h, --help        Show this very help message

${bold('EXAMPLES')}
        ${cyan('comfy set development admin.user "SuperUser"')}
        ${cyan('comfy set development admin.pass "S3cret" -t next')}
`);
};


module.exports = (ui, modules) => function* setall(rawOptions) {
    const {
        red,
        green,
        bold,
        dim,
    } = ui.colors;
    const options = minimist(rawOptions);
    const env = options._[0];
    const selector = options._[1];
    const tag = options.tag || options.t || 'stable';

    if (options.help || options.h || options._.includes('help')) {
        help(ui);
        return ui.exit(0);
    }

    if (!env) {
        ui.error(red('No environment specified.'));
    }

    if (!selector) {
        ui.error(red('No selector specified.'));
    }

    if (!env || !selector) {
        ui.print(`${bold('SYNOPSIS')}
        ${bold('comfy')} set <environment> <selector> <value> [<options>]

Type ${dim('comfy set --help')} for details`);
        return ui.exit(0);
    }

    const project = yield modules.project.retrieveFromConfig();
    const config = yield modules.config.get(project, env, {
        configName: 'default',
        tag,
    });

    console.log('config', config);

    ui.print(`${bold(green('comfy configuration successfully saved'))}`);
    return ui.exit();
};
