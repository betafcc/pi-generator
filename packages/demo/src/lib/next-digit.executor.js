import Executor from './executor'
import NextDigitWorker from  './next-digit.worker'
import {parseEnv, stringifyEnv} from '@betafcc/pi-digits'


class NextDigitExecutor extends Executor {
  nextDigit = () => this
    .submit({type: 'NEXT_DIGIT'})

  getStrEnv = () => this
    .submit({type: 'REQUEST_ENV'})

  getEnv = () => this
    .getStrEnv()
    .then(env => parseEnv(env))

  setStrEnv = strEnv => this
    .submit({
      type: 'SET_ENV',
      env: strEnv,
    })

  setEnv = env => this
    .setStrEnv(stringifyEnv(env))

  reset = () => this
    .submit({type: 'RESET'})
}


export default new NextDigitExecutor(new NextDigitWorker())
