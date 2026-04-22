import { RefObject, useEffect, useRef } from 'react'

type UseOutsideClickOptions = {
  /** 이벤트 리스너 활성화 여부 (기본값: true) */
  enabled?: boolean
  /**
   * capture 단계에서 감지 여부 (기본값: false)
   * 내부 요소가 stopPropagation을 호출하는 경우 true로 설정
   */
  capture?: boolean
  /**
   * 클릭해도 외부 클릭으로 처리하지 않을 추가 요소의 ref 목록
   * 예: 드롭다운을 여는 트리거 버튼
   */
  ignoredRefs?: RefObject<HTMLElement>[]
}

/**
 * 특정 요소 외부 클릭을 감지하는 훅
 * @param callback 외부 클릭 시 실행할 함수
 * @param options enabled, capture, ignoredRefs
 * @returns 감지 대상 요소에 연결할 ref
 *
 * @example
 * const triggerRef = useRef<HTMLButtonElement>(null)
 * const panelRef = useOutsideClick(() => setOpen(false), {
 *   enabled: isOpen,
 *   ignoredRefs: [triggerRef],
 * })
 */
export default function useOutsideClick<T extends HTMLElement>(
  callback: (e: PointerEvent) => void,
  {
    enabled = true,
    capture = false,
    ignoredRefs = [],
  }: UseOutsideClickOptions = {},
) {
  const ref = useRef<T>(null)
  const callbackRef = useRef(callback) // Options 변경 값 감지

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) return

    const handleClick = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (!target || !document.contains(target)) return
      if (!ref.current || ref.current.contains(target)) return

      const isIgnored = ignoredRefs.some(r => r.current?.contains(target))
      if (isIgnored) return

      callbackRef.current(e)
    }

    document.addEventListener('pointerdown', handleClick, capture)

    return () => {
      document.removeEventListener('pointerdown', handleClick, capture)
    }
  }, [enabled, capture])

  return ref
}
