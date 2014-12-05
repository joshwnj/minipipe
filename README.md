minipipe
====

Being able to connect the output of one object to another, and pass it through a transform, helps structure code cleanly. Objects provide a generic way to communicate with each other, rather than having to couple tightly.

Traditionally we do this with streams.

In this experiment, we're asking the question _"What if you are cool with the limitation of each pipe only being able to connect to one thing?"_, and seeing if there is anything of value here which is not too crazy or stupid.

The idea here is that objects can provide the minimal interface for these 1-to-1 pipes, and then if you ever need more it should be trivial to pipe into a regular stream (or eventemitter even).

License
----

MIT
