// Based on https://github.com/syntactic-sour/vue-pagination
// Written in TDD style

import { onBeforeMount, watch } from 'vue'
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

  onBeforeMount(() => {
    const isValidLimit = isValidQueryLimit(route.query[queryParamsAlias.showParam])
    const isValidPage = isValidQueryPage(route.query[queryParamsAlias.pageParam])
    if (isValidLimit && isValidPage) {
      return
    }

    const newQuery: LocationQuery = {}

    if (!isValidLimit) {
      newQuery[queryParamsAlias.showParam] = String(paginationApiParams.value.limit)
    }
    if (!isValidPage) {
      newQuery[queryParamsAlias.pageParam] = String(currentPage.value)
    }

    router.push({ query: newQuery })
  })

  onBeforeMount(() => {
    const isValidLimit = isValidQueryLimit(route.query[queryParamsAlias.showParam])
    const isValidPage = isValidQueryPage(route.query[queryParamsAlias.pageParam])
    if (isValidLimit && isValidPage) {
      return
    }

    const newQuery: LocationQuery = {}

    if (!isValidLimit) {
      newQuery[queryParamsAlias.showParam] = String(paginationApiParams.value.limit)
    }
    if (!isValidPage) {
      newQuery[queryParamsAlias.pageParam] = String(currentPage.value)
    }

    router.push({ query: newQuery })
  })

  watch(() => route.query, updateQueryParams, { immediate: true })

  async function updateQueryParams(queryParams: LocationQuery) {
    const isValidNewQueryLimit = isValidQueryLimit(queryParams[queryParamsAlias.showParam])
    const isValidNewQueryPage = isValidQueryPage(queryParams[queryParamsAlias.pageParam])
    const newQueryParams: LocationQuery = {}

    if (!isValidNewQueryLimit) {
      newQueryParams[queryParamsAlias.showParam] = String(paginationApiParams.value.limit)
    }

    if (!isValidNewQueryPage) {
      newQueryParams[queryParamsAlias.pageParam] = String(currentPage.value)
    }

    if (!isValidNewQueryLimit || !isValidNewQueryPage) {
      router.push({ query: newQueryParams })

      return
    }

    // Important to keep this order. Limit may reset the page to 1
    _setLimit(Number(queryParams[queryParamsAlias.showParam]))
    setPage(Number(queryParams[queryParamsAlias.pageParam]))
  }

  function setLimit(newLimit: number) {
    _setLimit(newLimit)
    const newQuery: LocationQuery = {
      page: route.query[queryParamsAlias.pageParam],
      show: String(newLimit),
    }

    router.push({ query: newQuery })
  }

  return {
    limitsWhitelist,
    currentLimit,
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setLimit,
  }
}
