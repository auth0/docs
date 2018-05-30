---
section: libraries
title: Logging in Lock for iOS v2
description: Logging in Lock for iOS v2
tags:
  - libraries
  - lock
  - ios
  - logs
---
# Logging in Lock for iOS v2

Lock provides options to easily turn on and off logging capabilities, as well as adjust other logging related settings.

## logLevel

By default this is `.off`, *Syslog* logging levels are supported.

```swift
.withOptions {
  $0.logLevel = .all
}
```

## logHttpRequest

This option allows you to choose whether or not to log Auth0.swift API requests. By default this is `false`.

```swift
.withOptions {
  $0.logHttpRequest = true
}
```

## loggerOutput

You can specify a logger output handler, by default this uses the `print` statement.

```swift
.withOptions {
  $0.loggerOutput = CleanroomLockLogger()
}
```

In the code above, the `loggerOutput` has been set to use [CleanroomLogger](https://github.com/emaloney/CleanroomLogger). This can typically be achieved by implementing the `loggerOutput` protocol.  You can of course use your favorite logger library. Below is an example of usage handling logger output with CleanroomLogger.

```swift
class CleanroomLockLogger: LoggerOutput {
  func message(_ message: String, level: LoggerLevel, filename: String, line: Int) {
    let channel: LogChannel?
    switch level {
    case .debug:
        channel = Log.debug
    case .error:
        channel = Log.error
    case .info:
        channel = Log.info
    case .verbose:
        channel = Log.verbose
    case .warn:
        channel = Log.warning
    default:
        channel = nil
    }
    channel?.message(message, filePath: filename, fileLine: line)
  }
}
```