import { useEffect, useState } from "react"

export function useIsDesktop() {
  const get = () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  const [isDesktop, setIsDesktop] = useState<boolean>(get())

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    setIsDesktop(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return isDesktop
}
