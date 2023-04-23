import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter
export default function duplicatedRouteCallbackFn(failure){
    if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      // 向用户显示一个小通知
      console.log(failure.message)
    }
}