const utils = {

  uniqid()
  {
    let uniqid  = require('uniqid')
    return uniqid()
  },

  // A naive attempt at getting the global `this`. Don’t use this!
  global()  {
    //if (typeof globalThis !== 'undefined') return globalThis
    if (typeof self !== 'undefined') return self
    if (typeof window !== 'undefined') return window
    if (typeof global !== 'undefined') return global
    // Note: this might still return the wrong result!
    if (typeof this !== 'undefined') return this
    throw new Error('Unable to locate global `this`')
  },


}

export default utils
