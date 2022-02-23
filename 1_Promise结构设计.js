// Promise/A+ 规范

// 状态
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class ZTPromise {
  constructor(executor) {
    // 默认pending状态
    this.status = PROMISE_STATUS_PENDING
    // 保存参数的变量，我们.then时需要用到
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      // 状态判断
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        // 这里直接调用onFulfilled时会报错，因为new的时候还没有执行.then方法
        // 使用定时器，不阻塞主线程
        // setTimeout(() => {
        //   this.status = PROMISE_STATUS_FULFILLED
        //   this.value = value
        //   this.onFulfilled(this.value)
        // }, 0)
        // 但是setTimeout是一个宏任务，这里最好还是使用微任务
        queueMicrotask(() => {
          this.value = value
          this.onFulfilled(this.value)
        })
      }
    }

    const reject = (reason) => {
      // 状态判断
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        // 同理
        queueMicrotask(() => {
          this.reason = reason
          this.onRejected(this.reason)
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

const promise = new ZTPromise((resolve, reject) => {
  resolve(111)
  reject(222)
})

promise.then(res => {
  console.log('res1:', res)
}, err => {
  console.log('err1:', err)
})

// 多次调用then方法
promise.then(res => {
  console.log('res2:', res)
}, err => {
  console.log('err2:', err)
})

// 还存在的问题
// 1、多次调用then方法时，后面的then方法会覆盖前面的方法
// 2、无法进行链式调用
