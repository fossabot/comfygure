---
layout: default
title: "Basic Usage"
---

## Initialization

Initialize comfygure in a project directory with `comfy init`:

```bash
> cd dev/my-project
> comfy init

Initializing project configuration...
Project created on comfy server https://comfy.marmelab.com
Configuration saved locally in .comfy/config
comfy project successfully created
```

By default, the `comfy` command stores encrypted data in the `comfy.marmelab.com` server. To host your own comfy server, see [the related documentation](./AdvancedUsage.html#host-your-own-comfy-server).

### `.comfy/` Folder

The initialization creates:

* A `.comfy/config` file containing all identification and credentials about the current project, to allow synchronization with the comfygure server
* A new line on your `.gitignore` in order to avoid committing this file (if a `.git` folder is found in the current folder)

Here is how the comfygure config file looks like.

```bash
> cat .comfy/config

[project]
# Your project ID to identify your project, useful to debug
projectId=1111111111-1111-1111-1111-1111111111111
# Your credentials to access to the comfy server
accessKey=XXXXXXXXXXXXXXXX
secretToken=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
# The comfy server URI
origin=https://comfy.marmelab.com
# The private key used to encrypt your configuration, never sent to the server
privateKey=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# The HMAC key used to sign and verify the integrity of your configuration, never sent to the server
hmacKey=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

The comfy server don't have access to your private and HMAC keys, ever. Be sure to keep these informations safe and secure.

**Warning**: If you lose this file, you will no longer be able to retrieve your settings, and no one will be able to help you, not even the server administrators.

## Managing Environments

By default, comfy creates one single environment, called `development`. You can choose a different name during initialization:

```bash
comfy init --env production
```

At any time, you can list environments, or create a new environment:

```bash
# list environments
> comfy env ls
development
# create a "production" environment
> comfy env add production
Environment successfully created
You can now set a configuration for this environment using comfy setall production
> comfy env ls
development
production
```

## Adding A New Version Of Settings

When you initialize comfygure on an app, it starts with no settings.

```bash
> comfy get development
{}
```

In order to add a new version of the settings, you have to use the `setall` command, with a file containing your settings.

```
> cat config.json
{ "login": "admin", "password": "S3cret!" }

> comfy setall development config.json
comfy configuration successfully saved
```

## Retrieving Settings

To retrieve the settings for an app, use `comfy get`:

```bash
> comfy get development
{
    "login": "admin",
    "password": "S3cret!"
}
```

Optionally, you can format the settings as a YAML, or as environment variables:

```bash
> comfy get development --yml
login: admin
password: S3cret!

> comfy get development --envvars
export LOGIN='admin';
export PASSWORD='S3cret!';
```

You can then use the standard output to create a new file, or source your environment variables.

```bash
> comfy get development --yml > src/config/development.yml
> cat src/config/development.yml
login: admin
password: S3cret!

> comfy get development --envvars | source /dev/stdin
> echo $LOGIN
admin
```

## Collaborating With A Team

To retrieve the settings of an app, comfygure needs all the information from the `.comfy/config` file for that app.

If you want to give the ability to Bob, your co-worker, to fetch the settings usinf comfygure, just give him this file.

```bash
scp .comfy/config bob@bob-workstation:~/repository/.comfy/config
```

You and Bob will now be able to share the settings. If bob edits a setting, you and other team members can retrieve it immediately.

## Deployment

The `.comfy/config` file is convenient for tests and development, but not for real deployment.

To this end, if comfy doesn't find `.comfy/config` from the current folder, it looks for the credentials in environment variables.

So for example, provided you have the following `.comfy/config` file:

```ini
[project]
projectId=1111111111-1111-1111-1111-1111111111111
accessKey=XXXXXXXXXXXXXXXX
secretToken=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
origin=https://comfy.marmelab.com
privateKey=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
hmacKey=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

You can specify the following environment variables to replace it:

```bash
export COMFY_PROJECT_ID=1111111111-1111-1111-1111-1111111111111;
export COMFY_ACCESS_KEY=XXXXXXXXXXXXXXXX;
export COMFY_SECRET_TOKEN=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY;
export COMFY_ORIGIN=https://comfy.marmelab.com;
export COMFY_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
export COMFY_HMAC_KEY=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy;

comfy get production
```

Set these environment variables in your CI configuration, code builder, or any continuous delivery system to let them use your settings. The advantage is that you only have to do it once.
