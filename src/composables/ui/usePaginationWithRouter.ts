// Based on https://github.com/syntactic-sour/vue-pagination
// Written in TDD style

import { useRoute, useRouter, type LocationQuery, type LocationQueryValue } from 'vue-router'
import { DEFAULT_PAGINATION_LIMITS, usePagination } from './usePagination'

export interface QueryParamsAlias {
  showParam: string
  pageParam: string
}

export const DEFAULT_QUERY_PARAMS_ALIAS = {
  showParam: 'show',
  pageParam: 'page',
}

export function usePaginationWithRouter(
  limits = DEFAULT_PAGINATION_LIMITS,
  queryParamsAlias: QueryParamsAlias = DEFAULT_QUERY_PARAMS_ALIAS,
) {
  const route = useRoute()
  const router = useRouter()

  const {
    limitsWhitelist,
    currentLimit,
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setPage,
    setLimit: _setLimit,
  } = usePagination({
    limits,
    show:
      !isNaN(Number(route.query[queryParamsAlias.showParam])) &&
      limits.has(Number(route.query[queryParamsAlias.showParam]))
        ? Number(route.query[queryParamsAlias.showParam])
        : undefined,
    page: isValidQueryPage(route.query[queryParamsAlias.pageParam])
      ? Number(route.query[queryParamsAlias.pageParam])
      : undefined,
  })

  function isValidQueryPage(page: LocationQueryValue | LocationQueryValue[]) {
    return !isNaN(Number(page)) && Number(page) > 0
  }

  function isValidQueryLimit(show: LocationQueryValue | LocationQueryValue[]) {
    return !isNaN(Number(show)) && limitsWhitelist.value.has(Number(show))
  }

  function setLimit(newLimit: number) {
    _setLimit(newLimit)
    const newQuery: LocationQuery = {
      ...route.query,
      [queryParamsAlias.pageParam]: String(currentPage.value),
      [queryParamsAlias.showParam]: String(newLimit),
    }

    router.push({ query: newQuery })
  }

  function getInitialParams(oldParams: LocationQuery = {}) {
    const isValidLimit = isValidQueryLimit(oldParams[queryParamsAlias.showParam])
    const isValidPage = isValidQueryPage(oldParams[queryParamsAlias.pageParam])
    if (isValidLimit && isValidPage) {
      return
    }

    const newQuery: LocationQuery = { ...oldParams }

    if (!isValidLimit) {
      newQuery[queryParamsAlias.showParam] = String(paginationApiParams.value.limit)
    }
    if (!isValidPage) {
      newQuery[queryParamsAlias.pageParam] = String(currentPage.value)
    }

    return newQuery
  }

  function setInitialParams(params: LocationQuery = {}) {
    router.push({ query: params, replace: true })
  }

  return {
    limitsWhitelist,
    currentLimit,
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setLimit,
    setPage,
    getInitialParams,
    setInitialParams,
  }
}
