# PASSWORD HASHER

Hashing refers to using an algorithm to map data of any size to a fixed length.
It’s a one-way operation that is primarily used for authentication.

This node app hashes credentials using a technique called salt hashing - salt is a random piece of data that is used as an additional input to a one-way operation that hashes data -, and store user credentials in the database.