import { call, put, fork, select } from 'redux-saga/effects'
import CtrlConst, { DefaultGamepadMapping } from '../constants/controller'

export default function * root () {


}


const delay = (ms) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  })
  return promise
}
