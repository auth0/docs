# How to Reconfigure IP Addresses Using the Command Line Interface

When running in a cluster, the Auth0 Appliance nodes need to know the IP addresses of the other nodes within the same cluster (they do not automatically detect each other). Whenever you move the network of the cluster, you may change the individual IP addresses using the console (TTY1) interface in the Virtual Machine Manager a la VMware. However, there is no easy way to tell the cluster nodes the new IP addresses of the other members of the cluster.

Beginning with Appliance build **6576**, you may reconfigure the mapping of IP addresses to the names of nodes for each Appliance node using the Appliance's Command Line Interface (CLI). Once this is done, the nodes may resume communication with one another within that cluster.

## Prerequisites

Prior to beginning, please be sure to [configure the CLI](/appliance/cli/configure-cli) for use in performing operations on your Appliance instances via authorized workstations.

## Using the `re-ip` Task

The `reip` task has the following signature:

```text
$a0cli -t <target node> re-ip "<hostname>:<ip>[,<hostname>:<ip>...]"
```

Running the above will modify the `<target node>`'s `/etc/hosts` file to point each `<hostname>` to its corresponding `<ip>`.

### Use Example

Suppose that you run the following command:

```text
$a0cli -t 10.0.0.11 re-ip "a0-1:10.0.0.21,a0-2:10.0.0.22,a0-3:10.0.0.23"
```

Suppose that this node has the following `/etc/hosts` file:

```text
# The following lines are desirable for IPv6 capable hosts
::1 ip6-localhost   ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
127.0.0.1   login.myauth0.com
127.0.0.1   login0.myauth0.com
127.0.0.1   login.appliancelab.net
127.0.0.1   auth.appliancelab.net
10.0.1.11   a0-1
10.0.1.12   a0-2
10.0.1.13 a0-3
```

Running the command results in the CLI modifying the `/etc/hosts` file so that it becomes the following:

```text
# The following lines are desirable for IPv6 capable hosts
::1 ip6-localhost   ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
127.0.0.1   login.myauth0.com
127.0.0.1   login0.myauth0.com
127.0.0.1   login.appliancelab.net
127.0.0.1   auth.appliancelab.net
10.0.1.21   a0-1
10.0.1.22   a0-2
10.0.1.23 a0-3
```
