# ADASH Cli

ADASH Cli is a tool for ABAP developers. 
It allows easy monitoring of packages tests and integration of ABAP tests into CI/CD pipelines. 
It works in conjunction with [ADASH Services](https://github.com/xinitrc86/adash-services) installed and set up at your(s) ABAP backend(s).

Its intention is to help teams monitor and nurture their code bases, enable CI/CD pipelines by providing an easy way of running ABAP Unit tests from anywhere. It also provides a cool watch feature for your code under test!

## Install

```bash
# with npm
npm install adash-cli -g

```

## Usage

### Monitor/Watch

```bash

adash adds dev -host https://dev-abap.org:8200 -a sap/zadash -c 200
adash addp zbc_adash -s dev
...
adash addp zdemo -s dev
adash mon dev
```
**Monitor**

![Monitor](https://raw.githubusercontent.com/xinitrc86/adash-cli/master/doc/images/monitor.gif)

**Watch**

![Watch](https://raw.githubusercontent.com/xinitrc86/adash-cli/master/doc/images/watch.gif)

### CI/CD Pipelines

Use a simple command for validating your ABAP packages:

```bash

adash adds dev -host https://dev-abap.org:8200 -a sap/zadash 
adash testp zadash -s dev -u user -p secret -i
```
Or relly on environment variables for a direct
```bash
adash testp zadash -i
```

![Cli testp](https://raw.githubusercontent.com/xinitrc86/adash-cli/master/doc/images/cli_testp.gif)

## Commands

```
-i --insecure
```
Is available at most of the commands that require communication, as most of dev systems have self signed certificates ;)

### testp|tp
Usage: testp|tp \<package> [options]\
Tests a \<package> in the given system.

Examples
```bash
  adash testp ZADASH -s DEV
```

Options:\
  -s, --system [system]  System to test the package\
    or\
  -u, --username [username]  User for ADASH Services endpoint\
  -p, --password [password]  Password for ADASH Services endpoint\
  -h, --host [host]          Host:port for ADASH Services endpoint\
  -a, --adash [adash]        Endpoint for ADASH services, default /sap/zadash\
  -c, --client [client]      System client if services not tagged to a default one

### testg|tg
Usage: testg|tg \<group> [options] 

Tests a \<group> of packagse in the given system.

Examples
```bash
  adash testg myPackages -s DEV
```

Options:\
  -s, --system [system]  System to test the group\
    or\
  -u, --username [username]  User for ADASH Services endpoint\
  -p, --password [password]  Password for ADASH Services endpoint\
  -h, --host [host]          Host:port for ADASH Services endpoint\
  -a, --adash [adash]        Endpoint for ADASH services, default /sap/zadash\
  -c, --client [client]      System client if services not tagged to a default one

## addsys|adds
Usage: addsys|adds \<system> [options]\
Adds a \<system> that has ADASH Services\

Examples
```bash
  adash adds dev -h https://my-server.com:8200 -a sap/zadash -u john -p secret
```

Options:\
  -u, --username [username]  User for ADASH Services endpoint\
  -p, --password [password]  Password for ADASH Services endpoint\
  -h, --host [host]          Host:port for ADASH Services endpoint\
  -a, --adash [adash]        Endpoint for ADASH services, default /sap/zadash\
  -c, --client [client]      System client if services not tagged to a default one\

Systems are stored at HOMEDIR/.adash/systems.json

## addpackage|addp
Usage: addpackage|addp \<package> [options] \
Adds a \<package> to the monitoring services of ADASH Services.

Examples
```bash
  adash addp zadash -g teamA -s dev
```

Options:\
  -g, --group \[group]   Test group for monitoring\
  -s, --system [system]  System to add package for monitoring\
    or\
  -u, --username [username]  User for ADASH Services endpoint\
  -p, --password [password]  Password for ADASH Services endpoint\
  -h, --host [host]          Host:port for ADASH Services endpoint\
  -a, --adash [adash]        Endpoint for ADASH services, default /sap/zadash\
  -c, --client [client]      System client if services not tagged to a default one

\[group]:\
Creates a group inside the system configuration and allow split monitoring of packages.\
* group 1:\
 * package a\
 * package b

* group 2:\
 * package c\
 * package a

Backend will always store all added packages for monitoring.

## monitor|mon 
Usage: monitor|mon \[group] [options]
Opens the \[group] of packages for monitoring. When no group is provided, the monitor will list all packages being monitored by ADASH in the backend. It requires the addition of a system widh adds (for now).

Examples
```bash
  adash mon myPackages -s dev
```
or, to monitor all packages added to adash
```bash
  adash mon -s dev
```


Options:\
  -s, --system \<system>   System for the monitoring.

Monitors a group. It uses [ADASH Monitor](https://github.com/xinitrc86/adash-monitor), connecting to the target system and displaying the last test results for the given group.

## Environment variables 

ADASH Cli will look for the following environment variables when not provided trough the command line.

ADASH_USERNAME\
ADASH_PASSWORD\
ADASH_HOST\
ADASH_ENDPOINT\
ADASH_CLIENT

This happens individually, meaning that your system setup may have the host and end point, the user is through -u and the password through ADASH_PASSORD environment variable.

### Help/Contribution

## Help Needed!
Any help or even suggestions are welcome. 
Specially on downporting the services as they currently relly on too many new syntax elements...anyone knows any abap transpiler? ;)




