import {nextDigit, initialEnv, parseEnv, stringifyEnv} from '@betafcc/pi-digits'


let env = initialEnv


const handler = message => {
  switch (message.type) {
    case 'NEXT_DIGIT'  :
      const before = Date.now();
      const [digit, newEnv] = nextDigit(env)
      const elapsed = Date.now() - before;
      env = newEnv
      return {elapsed, digit}

    case 'REQUEST_ENV' :
      return stringifyEnv(env)

    case 'SET_ENV'     :
      env = parseEnv(message.env)
      return;

    case 'RESET'   :
      env = initialEnv
      return;

    default: return message
  }
}


onmessage = ({data: {id, message}}) =>
  postMessage({id, message: handler(message)})
