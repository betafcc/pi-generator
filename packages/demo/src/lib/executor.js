import EventEmitter from 'events'


export default class Executor extends EventEmitter {
  constructor(worker) {
    super();
    this._worker = worker
    this._id     = Number.MIN_SAFE_INTEGER

    worker.onmessage = ({data: {id, message}}) =>
      this.emit(id, message)
  }

  submit = message => {
    const id = this._id++

    this._worker.postMessage({id, message})

    return new Promise(resolve =>
      this.once(id, resolve)
    )
  }
}


// unnecessarily expensive, use just a int id incrementer
// const uuid4 = () =>
//   ([1e7]+-1e3+-4e3+-8e3+-1e11)
//     .replace(/[018]/g, c =>
//       (c ^ crypto.getRandomValues(new Uint8Array(1))[0]
//        & 15 >> c / 4).toString(16)
//     )
