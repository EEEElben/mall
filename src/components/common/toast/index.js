import Toast from './toast'

const obj = {}

obj.install = function(Vue){
  Vue.prototype.$toast = Toast
}

export default obj