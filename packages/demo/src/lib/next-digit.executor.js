import Executor from './executor'
import NextDigitWorker from  './next-digit.worker'
import {parseEnv, stringifyEnv} from '@betafcc/pi-digits'


class NextDigitExecutor extends Executor {
  nextDigit = () => this
    .submit({type: 'NEXT_DIGIT'})

  getRawEnv = () => this
    .submit({type: 'REQUEST_ENV'})

  getEnv = () => this
    .getRawEnv()
    .then(env => parseEnv(env))

  setRawEnv = rawEnv => this
    .submit({
      type: 'SET_ENV',
      env: rawEnv,
    })

  setEnv = env => this
    .setRawEnv(stringifyEnv(env))

  reset = () => this
    .submit({type: 'RESET'})
}


export default new NextDigitExecutor(new NextDigitWorker())
