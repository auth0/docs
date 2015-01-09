# Prerequisites

## Internet Connectivity

The connector must be installed on a server with outbound connectivity to at the very least `<account>.auth0.com`.

The connector can be installed and configured behind a proxy server but we don't recommend this.

No inbound rules are required unless **Kerberos** or **Certifictate authentication** is enabled.

It is very important to have the clock automatically synchronized with an ntp server otherwise the connector will fail to start reporting a clock skew error.

## Hardware

-  Architecture: x86 or x86-64
-  CPU cores: min 1, recommended 2
-  Storage: 500MB of free space on disk
-  Operative System: The connector can be run on Windows or Linux
-  RAM: min 2G

## Windows Version

The connector can be run on Windows 7+ or Windows 2008R2+.

We recommend Windows 2012.