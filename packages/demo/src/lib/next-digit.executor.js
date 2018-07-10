import Executor from './executor'
import NextDigitWorker from  './next-digit.worker'
import {parseEnv, stringifyEnv} from '@betafcc/pi-digits'


class NextDigitExecutor extends Executor {
  nextDigit = () => this
    .submit({type: 'NEXT_DIGIT'})

  getEnv = () => this
    .submit({type: 'REQUEST_ENV'})
    .then(env => parseEnv(env))

  setEnv = env => this
    .submit({
      type: 'SET_ENV',
      env: stringifyEnv(env),
    })

  reset = () => this
    .submit({type: 'RESET'})
}


export default new NextDigitExecutor(new NextDigitWorker())
