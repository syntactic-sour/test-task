import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent } from 'vue'
import * as VueRouterExports from 'vue-router'
import { router } from './mock/routerMock.ts'
import { getRouteMock } from './mock/routeMock.ts'
import { usePaginationWithRouter } from '../usePaginationWithRouter.ts'
import { mount } from '@vue/test-utils'

vi.mock('vue-router')
const TestComponent = defineComponent({
  props: {
    limitVariants: Set<number>,
  },
  setup(props) {
    return usePaginationWithRouter(props.limitVariants)
  },
  template: '<div/>',
})

describe('usePaginationWithRouter', () => {
  vi.mocked(VueRouterExports.useRouter).mockReturnValue({
    ...router,
    push: vi.fn(),
  })

  beforeEach(() => {
    vi.mocked(VueRouterExports.useRouter()).push.mockReset()
    vi.mocked(VueRouterExports.useRoute).mockReset()
  })

  it('keeps limit and page in pagination from query params', () => {
    const mockedRoute = getRouteMock()
    mockedRoute.query = { show: '20', page: '3' }
    vi.mocked(VueRouterExports.useRoute).mockReturnValue(mockedRoute)

    const limitVariants = new Set([10, 20])
    const wrapper = mount(TestComponent, { props: { limitVariants } })

    wrapper.vm.setTotal(61)

    expect(wrapper.vm.paginationApiParams.limit).toEqual(20)
    expect(wrapper.vm.currentPage).toEqual(3)

    wrapper.unmount()
  })
})
