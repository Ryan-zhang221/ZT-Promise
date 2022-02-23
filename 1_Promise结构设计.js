// Promise/A+ 规范

class ZTPromise {
  constructor(executor) {
    const resolve = () => {
      console.log('resolve被调用')
    }

    const reject = () => {
      console.log('reject被调用')
    }

    executor(resolve, reject)
  }
}

const promise = new ZTPromise((resolve, reject) => {
  resolve()
  reject()
})

