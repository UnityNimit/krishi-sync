import { useMatches } from 'react-router-dom'
import { RouteMetadata } from '../types/navigation'

export function useRouteConfig(): RouteMetadata {
  const matches = useMatches()

  const routeHandle = matches[matches.length - 1]?.handle as RouteMetadata | undefined

  return {
    title: routeHandle?.title,
    description: routeHandle?.description,
    stakeholder: routeHandle?.stakeholder,
    navigation: routeHandle?.navigation,
    breadcrumbs: routeHandle?.breadcrumbs
  }
}
