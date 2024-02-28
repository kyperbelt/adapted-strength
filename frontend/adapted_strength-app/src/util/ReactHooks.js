import { matchRoutes, useLocation } from "react-router-dom"

// const routes = [{ path: "/members/:id" }]
/**
 * @param {Array} routes
  * @returns {string} route.path
  * @description This hook returns the current path of the route
  * @example
  * const currentPath = useCurrentPath(routes)
  * console.log(currentPath) // "/members/:id"
  */
export function useCurrentPath(routes){
  const location = useLocation()
  const [{ route }] = matchRoutes(routes, location)
  return route.path
}
