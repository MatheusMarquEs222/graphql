import { useEffect, useState } from "react"

export function useIsDesktop() {
  const get = () => window.matchMedia("(min-width: 768px)").matches
  const [isDesktop, setIsDesktop] = useState(get())

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return isDesktop
}
