# Introduction

This is the documentation for [Signal K specification](https://github.com/signalk/specification) master version available in the following formats:
* [html](http://signalk.org/specification/master/)
* [pdf](http://signalk.org/specification/master/signalk_master.pdf)
* [epub](http://signalk.org/specification/master/signalk_master.epub)
* [mobi](http://signalk.org/specification/master/signalk_master.mobi)

## What is Signal K?

'Signal K' the open source project to develop a modern extendable, internet friendly standard for marine data. Since its open source, we are developing it in the open, where you can see and contribute. Your ideas and feedback is valuable and welcome.

Signal K has many aspects:

## Signal K Data Model (schema)

The Signal K schema defines a universal data model for marine related information and its defined as a json schema. See [Signal K Data Model](data_model.md)

In traditional marine standards there are many tightly defined messages, each with a purpose, but there is no data model to relate them. By defining a data model we can make the messaging layer simpler, and extensible. We define consistent units and meta data for a data point in the model. This means that a specific value (eg COG) will always be found at a predictable address.

It means that if we need COG, we dont need to support and decode all the different messages that may contain it, it will always be the same key in any Signal K message.

### Signal K Message Format

Signal K defines methods for combining arbitrary data from the Data Model into valid messages. These messages are in UTF-8 JSON format.

Rather than define hundreds of specific messages, Signal K has a few common message formats which can contain any combination of data from the Data Model. This means that we dont need new messages for every new case, just extra data in the payload. It means that a device can always read the message, but may ignore new information it doesnt understand. This allows us to extend the protocol while remaining backwards compatible with existing devices.

eg If we need COG, we just parse messages for the COG address, and ignore other data.

## Signal K Transport Layer

Signal K does not define the transport or wire protocol. Signal K messages are json text and can be sent over almost any transport layer. But we provide guidance on how we expect to make initial connection, negoitiation, subscription, and disconnection for a given transport (eg TCP, or serial).

Where possible we use well established standards, like HTTPS, REST, websockets, MQTT, STOMP, etc. But within each method there are always many options in message addressing, formating, or transfer (GET, POST), etc.

The goal here is to try to establish sensible conventions for each protocol, to make development and interconnection more predictable.

## Signal K Implementations

The Signal K project has many implementations of servers, clients, and utilities. These are both proof of concept tests, and reference code. The goal is to provide a range of software and utilities to simplify development.
