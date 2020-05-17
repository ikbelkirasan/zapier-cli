zapier-cli
==========

My Custom Zapier CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/zapier-cli.svg)](https://npmjs.org/package/zapier-cli)
[![Downloads/week](https://img.shields.io/npm/dw/zapier-cli.svg)](https://npmjs.org/package/zapier-cli)
[![License](https://img.shields.io/npm/l/zapier-cli.svg)](https://github.com/https://github.com/ikbelkirasan/zapier-cli/zapier-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g zapier-cli
$ zapier-cli COMMAND
running command...
$ zapier-cli (-v|--version|version)
zapier-cli/1.0.0 linux-x64 node-v12.14.0
$ zapier-cli --help [COMMAND]
USAGE
  $ zapier-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`zapier-cli help [COMMAND]`](#zapier-cli-help-command)
* [`zapier-cli integrations`](#zapier-cli-integrations)
* [`zapier-cli login`](#zapier-cli-login)
* [`zapier-cli push`](#zapier-cli-push)
* [`zapier-cli register TITLE`](#zapier-cli-register-title)
* [`zapier-cli run`](#zapier-cli-run)
* [`zapier-cli validate`](#zapier-cli-validate)

## `zapier-cli help [COMMAND]`

display help for zapier-cli

```
USAGE
  $ zapier-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `zapier-cli integrations`

List any integrations that you have admin access to.

```
USAGE
  $ zapier-cli integrations

OPTIONS
  -a, --account=account  (required) The account to which the app should be uploaded
  -h, --help             show CLI help
```

_See code: [src/commands/integrations.ts](https://github.com/ikbelkirasan/zapier-cli/blob/v1.0.0/src/commands/integrations.ts)_

## `zapier-cli login`

Fetch a deploy key.

```
USAGE
  $ zapier-cli login

OPTIONS
  -a, --account=account  (required) The account name that will be used as a identifier to store the deploy key
  -h, --help             show CLI help
```

_See code: [src/commands/login.ts](https://github.com/ikbelkirasan/zapier-cli/blob/v1.0.0/src/commands/login.ts)_

## `zapier-cli push`

Build and upload the current app.

```
USAGE
  $ zapier-cli push

OPTIONS
  -a, --account=account  (required) The account to which the app should be uploaded
  -h, --help             show CLI help
```

_See code: [src/commands/push.ts](https://github.com/ikbelkirasan/zapier-cli/blob/v1.0.0/src/commands/push.ts)_

## `zapier-cli register TITLE`

Register a new integration in your account.

```
USAGE
  $ zapier-cli register TITLE

OPTIONS
  -a, --account=account  (required) The account name that will be used to store the new integration configuration
  -h, --help             show CLI help
```

_See code: [src/commands/register.ts](https://github.com/ikbelkirasan/zapier-cli/blob/v1.0.0/src/commands/register.ts)_

## `zapier-cli run`

Run a command using the original Zapier CLI.

```
USAGE
  $ zapier-cli run

OPTIONS
  -a, --account=account  (required) The account name that will be used to store the new integration configuration
  -h, --help             show CLI help
```

_See code: [src/commands/run.ts](https://github.com/ikbelkirasan/zapier-cli/blob/v1.0.0/src/commands/run.ts)_

## `zapier-cli validate`

Validate your integration.

```
USAGE
  $ zapier-cli validate

OPTIONS
  -a, --account=account  (required) The account name that will be used to store the new integration configuration
  -h, --help             show CLI help
```

_See code: [src/commands/validate.ts](https://github.com/ikbelkirasan/zapier-cli/blob/v1.0.0/src/commands/validate.ts)_
<!-- commandsstop -->
