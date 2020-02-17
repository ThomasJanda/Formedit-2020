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

  absoluteLeftTopToPanel(el, parentId)
  {
    let c = { left:0, top:0 }

    let max=100
    let x=0
    do
    {
      if(el.getAttribute('data-type')==="container"
        && el.getAttribute('data-id')===parentId
      )
      {
        //panel element
        break
      }
      else
      {
        //element
        c.left += el.offsetLeft
        c.top += el.offsetTop
      }
      el = el.parentElement
      x++
    } while(max > x)

    return c
  },

  findFirstParentContainer(vm, el, ownId=null)
  {
    let max=null
    let x=null

    //ownId can be part of the list. If it is part of the list, start with this element
    if(ownId !== null)
    {
      let tmpEl = el
      max=100
      x=0

      do
      {
        if(tmpEl.getAttribute('data-id')===ownId) {
          //take next parent
          el = tmpEl.parentElement
          break
        }
        else if(tmpEl.getAttribute('data-id')===vm.panelId)
        {
          //panel element
          break
        }
        tmpEl = tmpEl.parentElement
        x++
      } while(max > x)
    }

    //find next containar relative from el to panel
    let sContainerId = false
    max=100
    x=0
    do
    {
      if(el.getAttribute('data-type')==="container")
      {
        //panel element
        sContainerId = el.getAttribute('data-id')
        break
      }
      el = el.parentElement
      x++
    } while(max > x)

    return sContainerId
  },

  snap(iValue, iMin = 0)
  {
    if(iValue < 0) iValue=0
    iValue = Math.round(iValue)
    iValue = Math.round(iValue/10) * 10
    if(iValue < iMin)
      iValue = iMin
    return iValue
  },

  intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top)
  }
}

export default utils
