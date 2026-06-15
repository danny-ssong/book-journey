'use client'

import { useEffect, useRef } from 'react'

type Options = {
  enabled: boolean
  message?: string
}

const DEFAULT_MESSAGE = '작성 중인 내용이 사라집니다. 페이지를 떠나시겠습니까?'

/**
 * 폼이 더티 상태일 때 페이지 이탈을 차단한다.
 *
 * 차단 범위:
 * - 브라우저 이탈(새로고침/탭 닫기/외부 URL): beforeunload
 * - Next.js Link 클릭: document click 캡처
 * - 뒤로/앞으로 가기(router.back 포함): popstate 캡처 + forward 복귀
 *
 * App Router 는 Link 클릭 시 React commit 이후 pushState 를 호출하므로
 * history API 패치 대신 클릭 캡처로 인터셉트한다.
 * 추후 next-navigation-guard 가 Next 16 을 지원하면 동일 시그니처로 교체 가능하다.
 *
 * @returns bypass — 정상 submit 등 의도적 네비게이션 직전에 호출해 guard 를 일시 해제한다.
 *                   onSubmit 을 try/finally 로 감싸 실패 시 bypass(false) 로 복귀시킨다.
 *
 */
export function useNavigationGuard({ enabled, message = DEFAULT_MESSAGE }: Options) {
  // bypass 는 컴포넌트 수명 전체에서 유지되어야 하므로 effect 바깥에 둔다
  const bypassRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    // enabled 가 다시 켜지면 이전 bypass 상태를 초기화 (제출 실패 후 재편집 등)
    bypassRef.current = false

    const confirmLeave = () => bypassRef.current || window.confirm(message)

    // 1) 브라우저 이탈
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!bypassRef.current) e.preventDefault()
    }

    // 2) Link 클릭 캡처 — Next.js 가 처리하기 전에 인터셉트
    //    App Router 는 React commit 이후 pushState 를 호출하므로 history 패치로는 막을 수 없다.
    //    캡처 단계에서 preventDefault + stopImmediatePropagation 으로 Next.js 핸들러를 차단한다.
    const handleLinkClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!link || !link.href) return
      if (link.target === '_blank') return
      if (link.origin !== window.location.origin) return
      // 같은 페이지 내 해시 이동은 skip
      if (link.pathname === window.location.pathname && link.hash) return

      if (!confirmLeave()) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }

    // 3) popstate — 캡처 단계로 등록해 Next.js 의 버블 단계 리스너보다 먼저 실행되도록 한다.
    //    거부 시 stopImmediatePropagation 으로 Next.js 리스너를 차단하고 forward 로 복귀.
    //    forward 가 또 popstate 를 발생시키므로 restoring 플래그로 무한루프를 차단한다.
    let restoring = false
    const handlePopState = (event: PopStateEvent) => {
      if (restoring) {
        restoring = false
        return
      }
      if (!confirmLeave()) {
        event.stopImmediatePropagation()
        restoring = true
        window.history.forward()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('click', handleLinkClick, { capture: true })
    window.addEventListener('popstate', handlePopState, { capture: true })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('click', handleLinkClick, { capture: true })
      window.removeEventListener('popstate', handlePopState, { capture: true })
    }
  }, [enabled, message])

  return {
    bypass: (active = true) => {
      bypassRef.current = active
    },
  }
}
