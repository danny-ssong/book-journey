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
 * - Next.js client-side navigation(Link, router.push/replace): window.history 패치
 * - 뒤로/앞으로 가기(router.back 포함): popstate + forward 로 복귀
 *
 * Next.js App Router 가 라우터 이벤트 API 를 제공하지 않아 history 를 직접 패치한다.
 * 추후 next-navigation-guard 가 Next 16 을 지원하면 동일 시그니처로 교체 가능하다.
 *
 * @returns bypass — 정상 submit 등 의도적 네비게이션 직전에 호출해 guard 를 일시 해제한다.
 *                   onSubmit 을 try/finally 로 감싸 실패 시 bypass(false) 로 복귀시킨다.
 *
 * @example
 *   const { bypass } = useFormUnloadGuard({ enabled: isDirty })
 *   const handleSubmit = async (values) => {
 *     bypass()
 *     try { await save(values) } finally { bypass(false) }
 *   }
 */
export function useFormUnloadGuard({ enabled, message = DEFAULT_MESSAGE }: Options) {
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

    // 2) History API 패치 — Link, router.push, router.replace 모두 여기로 수렴
    const originalPushState = window.history.pushState.bind(window.history)
    const originalReplaceState = window.history.replaceState.bind(window.history)

    window.history.pushState = (...args: Parameters<typeof originalPushState>) => {
      if (!confirmLeave()) return
      originalPushState(...args)
    }
    window.history.replaceState = (...args: Parameters<typeof originalReplaceState>) => {
      if (!confirmLeave()) return
      originalReplaceState(...args)
    }

    // 3) popstate — 이미 이동이 발생한 뒤이므로 거부 시 forward 로 복귀.
    //    forward 가 또 popstate 를 발생시키므로 restoring 플래그로 무한루프를 차단한다.
    let restoring = false
    const handlePopState = () => {
      if (restoring) {
        restoring = false
        return
      }
      if (!confirmLeave()) {
        restoring = true
        window.history.forward()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [enabled, message])

  return {
    bypass: (active = true) => {
      bypassRef.current = active
    },
  }
}
