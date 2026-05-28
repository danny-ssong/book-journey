import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

// 레이아웃 폭 단일 소스 — 헤더와 본문이 동일한 콘텐츠 폭/정렬 기준을 공유한다.
// 값이 바뀔 때 한 곳만 고치면 헤더·사이드바·본문 정렬이 함께 유지된다.
const LAYOUT_SIDEBAR_WIDTH = '200px' // 데스크톱 사이드바 폭
const LAYOUT_CONTENT_WIDTH = '48rem' // 본문(main) 최대 폭 (기존 max-w-3xl과 동일한 768px)

const config: Config = {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      width: {
        'layout-sidebar': LAYOUT_SIDEBAR_WIDTH,
      },
      maxWidth: {
        'layout-content': LAYOUT_CONTENT_WIDTH,
        // 헤더 콘텐츠와 본문(사이드바 + 본문)이 공유하는 전체 폭
        layout: `calc(${LAYOUT_SIDEBAR_WIDTH} + ${LAYOUT_CONTENT_WIDTH})`,
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
