import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary-1 hover:opacity-90 [&>svg]:text-accent-foreground dark:bg-primary-foreground',
        destructive: `px-4 py-2  text-sm font-medium bg-gradient-to-br shadow-lg rounded-full transition-all hover:-translate-y-1 text-fields border border-[#00000014] dark:border-[#ffffff1a]
        bg-gradient-to-br from-red-400 to-red-400 hover:from-red-500 hover:to-red-400
            dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-500`,
        blue: `px-4 py-2  text-sm font-medium bg-gradient-to-br shadow-lg rounded-full transition-all hover:-translate-y-1 text-white border border-[#00000014] dark:border-[#ffffff1a]
        bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400
        `,
        outline: `
          bg-blue-500 text-white border border-blue-500
          hover:bg-blue-600 hover:border-blue-600
          active:bg-blue-700 active:border-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-300
          transition-all duration-200
          rounded-md
        `,
        secondary:
          'text-accent-foreground border border-input hover:opacity-90 dark:bg-accent-foreground dark:text-foreground dark:border-none',
        tertiary:
          'bg-gray-900 text-white hover:opacity-90 [&>svg]:text-white dark:bg-gray-100 dark:text-foreground dark:[&>svg]:text-black',
        ghost: 'hover:bg-pastel hover:text-accent-foreground',
        link: 'text-primary-2 underline-offset-4 hover:underline',
        success: `px-4 py-2  text-sm font-medium bg-gradient-to-br shadow-lg rounded-full transition-all hover:-translate-y-1 text-fields border border-[#00000014] dark:border-[#ffffff1a]
        from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-400
        dark:from-teal-500 dark:to-teal-600 dark:hover:from-teal-600 dark:hover:to-teal-500 transition-all duration-300`,
        warning: 'bg-warning text-accent-foreground hover:opacity-90',
        buttonActive: `px-4 py-2 shadow-lg text-sm font-medium rounded-full transition-all hover:-translate-y-1 bg-glass text-white dark:text-black hover:bg-fields/90
          dark:active:bg-gradient-to-br dark:active:from-[#f8f9fa] dark:active:to-white active:shadow-sm
          active:from-[#252525] active:to-[#353535] active:shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(0,0,0,0.3)]
`,
        buttonInactive:
          'px-4 py-2  text-sm font-medium bg-gradient-to-br from-white to-[#f1f3f4] hover:from-[#f1f3f4] hover:to-white dark:from-[#353535] dark:to-[#252525] dark:hover:from-[#252525] dark:hover:to-[#353535] shadow-lg rounded-full transition-all hover:-translate-y-1 text-fields border border-[#00000014] dark:border-[#ffffff1a]',
        softButton: `
          btn-3d px-4 py-2 rounded-full transition transform
          bg-blue-500 text-white
          hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600 hover:shadow-lg hover:-translate-y-[1px]
          active:bg-gradient-to-br active:from-blue-300 active:to-blue-500 active:shadow-sm active:translate-y-0

          dark:bg-blue-600 dark:text-white
          dark:hover:from-blue-500 dark:hover:to-blue-700 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
          dark:active:from-blue-700 dark:active:to-blue-500 dark:active:shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(0,0,0,0.3)]
`
      },
      size: {
        default: 'h-10 px-2 py-2',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-11 rounded-full px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
