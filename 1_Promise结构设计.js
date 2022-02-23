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
        this.value = value
      }
    }

    const reject = (reason) => {
      // 状态判断
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
      }
    }

    executor(resolve, reject)
  }
}

const promise = new ZTPromise((resolve, reject) => {
  resolve(111)
  reject(222)
})

promise.then(res => {

}, err => {

})
