# Redis Cache

**A node cache package using redis.**

This package was written on top of the [node-redis](https://github.com/NodeRedis/node-redis) client package. The goal is to provide the ease of implementing caches with redis and also supporting the use of promises for
asynchronous operations.

## Installation
    npm install rn-cache
    
## Usage

Basic redis-cache implementation.

    import Cache from 'redis-cache';
    
    // create a cache instance.
    const cache = new Cache();
    
    // creates a redis-client connection,
    // connects to the redis server.
    cache.on();
    
    // storing a key with its value using the set-method.
    const key = 'MyKey';
    const value = 'Hello';
    async function saveKey(key, value) {
	    await cache.set(key, value);
	    return;
    }
    
    // getting a value with its key using the get-method.
    async function getKey(key) {
	    const value = await cache.get(key);
	    return value;
    }

#### **Promises:**
Package methods are asynchronous in nature and also supports the use of promises. Below is a simple usage
involving promises;

    // the get method can also be written as;
    await cache.get(key)
    .then((res) => { // enter your code here... })
    .catch((error) => { throw error })

## API
#### **"options:"**  

    const cache = new Cache({...options})
In order to configure the redis client connection, redis-cache takes in different option parameters as custom
configuration. These options are the same as seen in [node-redis package](https://github.com/NodeRedis/node-redis).

### **Methods:**
These are the available methods in redis-cache;

#### `on:`  
It creates a redis client connection with the redis server. 

    // it always listens for a client connection.
    cache.on()

> Throws an *error* if a connection cannot be established.

    
#### `set:`  
Stores a value with it's given key.

    const response = await cache.set(key, value, exp)

> It returns a string 'OK' when the value is saved.
> 

 - `key` : string.
 -  `value` : string or object.
 -  `exp` :  number. This parameter is optional, it is the time it takes for a key to expire in *seconds*.

Example:

    const key = 'myKey';
    const value = {
	    name: 'Username',
	    country: 'Canda',
	    skills: ['JavaScript', 'Python']
    };
    
    // using expiration time.
    const response = await cache.set(key, value, 10); // here the key will expire in 10 seconds.
    
    // not using expiration time.
    const response = await cache.set(key, value);
  
 #### `checkTime:`  
 It returns the time left for a key before it expires. Here the key being checked must have an expiration time attached to it.
 

    const time = await cache.checkTime(key)
  

> It returns a number in seconds.
>

 - `key` : string.

 #### `get:`  
 It returns the value of a given key.
 

    const value = await cache.get(key)
  

> The returned value can be a string or an object. It returns a string if the value is a string and an object
> if the value is an object.
> 

#### `del:`  
It deletes a key from redis.

    const response = await cache.del(key)

> It returns 1 if the key has been deleted.
>

 - `key` : string.

#### `multiSet:`  
Stores multiple keys  with their respective values.

    const keys = [
	    {key: 'myKey', value: 'Hello'},
	    {key: 'myNextKey', value: 'Hi'},
    ];
    
    const response = await cache.multiSet(keys);
  

> It returns 'OK' if the keys are saved.
>

 - `keys` :  an array of objects, with property's key and value. Where
   `key: string` and `value: string | object` .

 #### `multiGet:`  
 Gets the values of multiple keys.
 
    const keys = ['myKey', 'myNextKey'];
    const values = await cache.multiGet(keys);
    

> It returns an array of values, where each value corresponds to the given key in the keys-parameter.
>

 - `keys` : an array of strings, where each string is a key.

#### `multiDel:`  
Deletes multiple keys from redis.

    const keys = ['myKey', 'myNextKey'];
    const response = await cache.multiDel(keys);
 > It returns the number of deleted keys.
>  

 - `keys` : an array of strings, where each string is a key.

## License:
This code is licensed under the `MIT-License`.