import { useState } from 'react'
import { colors, spacing, radius, shadows, typography } from '@lucidui/tokens'
import { Button } from '@lucidui/react'

type Section = 'philosophy' | 'colors' | 'typography' | 'spacing' | 'buttons' | 'patterns'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('philosophy')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Lucid UI</h1>
              <p className="text-sm text-gray-500">Design System for AI Generation</p>
            </div>
            <a
              href="https://github.com/Deepractice/Lucid-UI"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 border-r border-gray-200 min-h-[calc(100vh-73px)] bg-gray-50 p-4 sticky top-[73px]">
          <div className="space-y-1">
            {[
              { id: 'philosophy', label: 'Philosophy', icon: '💎' },
              { id: 'colors', label: 'Colors', icon: '🎨' },
              { id: 'typography', label: 'Typography', icon: '📝' },
              { id: 'spacing', label: 'Spacing & Radius', icon: '📐' },
              { id: 'buttons', label: 'Buttons', icon: '🔘' },
              { id: 'patterns', label: 'Patterns', icon: '🧩' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'philosophy' && <PhilosophySection />}
          {activeSection === 'colors' && <ColorsSection />}
          {activeSection === 'typography' && <TypographySection />}
          {activeSection === 'spacing' && <SpacingSection />}
          {activeSection === 'buttons' && <ButtonsSection />}
          {activeSection === 'patterns' && <PatternsSection />}
        </main>
      </div>
    </div>
  )
}

function PhilosophySection() {
  return (
    <div className="space-y-12 max-w-4xl">
      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lucid Design Language</h1>
        <p className="text-xl text-gray-600">
          The design language of Deepractice
        </p>
      </div>

      {/* Core Philosophy */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Design Philosophy</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Lucid</strong> means clear, easily understood, and mentally sound.
            In an era where AI interfaces are often shrouded in mystique and complexity,
            we choose clarity as our guiding principle.
          </p>
          <blockquote className="border-l-4 border-primary-500 pl-6 my-6 text-gray-600 italic">
            "The best interface is one that disappears, letting users focus on what matters."
          </blockquote>
        </div>
      </div>

      {/* Three Pillars */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Three Pillars</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚪</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">White & Gray Foundation</h3>
            <p className="text-gray-600 text-sm">
              White provides breathing space. Gray creates hierarchy without distraction.
              Together they form a neutral canvas that lets content shine.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cool Blue Accent</h3>
            <p className="text-gray-600 text-sm">
              Blue represents clarity, trust, and intelligence. Used sparingly as an accent,
              it guides attention without overwhelming the experience.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No AI Purple</h3>
            <p className="text-gray-600 text-sm">
              We reject the overused purple gradients of AI products.
              Our technology speaks for itself without theatrical visual effects.
            </p>
          </div>
        </div>
      </div>

      {/* Why Not Purple */}
      <div className="bg-gray-900 text-white rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Why We Reject AI Purple</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-300">The Problem</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Purple gradients have become a cliché in AI products</li>
              <li>• They create artificial mystique rather than clarity</li>
              <li>• They prioritize aesthetics over usability</li>
              <li>• They make all AI products look the same</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-300">Our Approach</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Clarity over mystique</li>
              <li>• Function over decoration</li>
              <li>• Trust through transparency</li>
              <li>• Differentiation through simplicity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Brand Values</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: 'Professional', desc: 'Enterprise-grade quality' },
            { value: 'Trustworthy', desc: 'Reliable and consistent' },
            { value: 'Clear', desc: 'Easy to understand' },
            { value: 'Efficient', desc: 'Respects user time' },
          ].map(item => (
            <div key={item.value} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Design Principles */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Design Principles</h2>
        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Content First',
              desc: 'Design should elevate content, not compete with it. Every visual element must serve a purpose.'
            },
            {
              num: '02',
              title: 'Consistent Hierarchy',
              desc: 'Use typography, spacing, and color consistently to create clear visual hierarchy across all interfaces.'
            },
            {
              num: '03',
              title: 'Accessible by Default',
              desc: 'Design for everyone. Ensure sufficient contrast, clear focus states, and semantic structure.'
            },
            {
              num: '04',
              title: 'Restrained Decoration',
              desc: 'Avoid gratuitous animations, shadows, and effects. Each embellishment must earn its place.'
            },
          ].map(item => (
            <div key={item.num} className="flex gap-6 p-4 border-b border-gray-100">
              <span className="text-3xl font-bold text-gray-200">{item.num}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deepractice Identity */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-500 mb-2">A Design Language by</p>
        <p className="text-2xl font-bold text-gray-900">Deepractice</p>
        <p className="text-gray-600 mt-2">Making AI Generation Beautiful</p>
      </div>
    </div>
  )
}

function ColorsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Color System</h2>
        <p className="text-gray-600 mb-8">
          White and gray as foundation, cool blue as accent. No AI purple.
        </p>
      </div>

      {/* Gray Scale - The Core */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gray Scale (Core)</h3>
        <div className="grid grid-cols-11 gap-2">
          {Object.entries(colors.gray).map(([shade, value]) => (
            <div key={shade} className="text-center">
              <div
                className="h-16 rounded-md border border-gray-200 mb-2"
                style={{ backgroundColor: value }}
              />
              <p className="text-xs font-medium text-gray-700">{shade}</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Primary - Cool Blue */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Primary (Cool Blue)</h3>
        <div className="grid grid-cols-11 gap-2">
          {Object.entries(colors.primary).map(([shade, value]) => (
            <div key={shade} className="text-center">
              <div
                className="h-16 rounded-md border border-gray-200 mb-2"
                style={{ backgroundColor: value }}
              />
              <p className="text-xs font-medium text-gray-700">{shade}</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Semantic Colors</h3>
        <div className="grid grid-cols-3 gap-6">
          {/* Success */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Success</h4>
            <div className="grid grid-cols-5 gap-1">
              {['100', '300', '500', '700', '900'].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-10 rounded border border-gray-200 mb-1"
                    style={{ backgroundColor: colors.success[shade as keyof typeof colors.success] }}
                  />
                  <p className="text-xs text-gray-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Warning */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Warning</h4>
            <div className="grid grid-cols-5 gap-1">
              {['100', '300', '500', '700', '900'].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-10 rounded border border-gray-200 mb-1"
                    style={{ backgroundColor: colors.warning[shade as keyof typeof colors.warning] }}
                  />
                  <p className="text-xs text-gray-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Error */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Error</h4>
            <div className="grid grid-cols-5 gap-1">
              {['100', '300', '500', '700', '900'].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-10 rounded border border-gray-200 mb-1"
                    style={{ backgroundColor: colors.error[shade as keyof typeof colors.error] }}
                  />
                  <p className="text-xs text-gray-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Example */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Live Example</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div>
              <p className="font-medium text-gray-900">AI Assistant</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            This example demonstrates how our color system creates clear visual hierarchy.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded">Active</span>
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">Premium</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypographySection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Typography</h2>
        <p className="text-gray-600 mb-8">
          Inter for interface text, JetBrains Mono for code.
        </p>
      </div>

      {/* Font Family */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Font Families</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Sans (Inter)</p>
            <p className="text-3xl" style={{ fontFamily: typography.fontFamily.sans.join(', ') }}>
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Mono (JetBrains Mono)</p>
            <p className="text-2xl" style={{ fontFamily: typography.fontFamily.mono.join(', ') }}>
              const greeting = "Hello World"
            </p>
          </div>
        </div>
      </div>

      {/* Font Sizes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Font Sizes</h3>
        <div className="space-y-4">
          {Object.entries(typography.fontSize).map(([name, [size, config]]) => (
            <div key={name} className="flex items-baseline gap-4 border-b border-gray-100 pb-3">
              <span className="w-16 text-sm text-gray-500">{name}</span>
              <span className="w-20 text-sm text-gray-400">{size}</span>
              <span
                style={{ fontSize: size, lineHeight: config.lineHeight }}
                className="text-gray-900"
              >
                Lucid UI Design System
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Font Weights</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(typography.fontWeight).map(([name, weight]) => (
            <div key={name} className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl text-gray-900 mb-2" style={{ fontWeight: weight }}>Aa</p>
              <p className="text-sm text-gray-500">{name}</p>
              <p className="text-xs text-gray-400">{weight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SpacingSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Spacing & Radius</h2>
        <p className="text-gray-600 mb-8">
          4px grid system for consistent spacing. Restrained border radius.
        </p>
      </div>

      {/* Spacing Scale */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Spacing Scale (4px base)</h3>
        <div className="space-y-3">
          {Object.entries(spacing).slice(0, 12).map(([name, value]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-12 text-sm text-gray-500">{name}</span>
              <span className="w-16 text-sm text-gray-400">{value}</span>
              <div
                className="h-4 bg-primary-500 rounded-sm"
                style={{ width: value }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Border Radius</h3>
        <div className="grid grid-cols-6 gap-4">
          {Object.entries(radius).map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className="w-20 h-20 bg-primary-500 mx-auto mb-2"
                style={{ borderRadius: value }}
              />
              <p className="text-sm text-gray-700">{name}</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shadows */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shadows</h3>
        <div className="grid grid-cols-5 gap-6">
          {Object.entries(shadows).map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className="w-24 h-24 bg-white rounded-lg mx-auto mb-3"
                style={{ boxShadow: value }}
              />
              <p className="text-sm text-gray-700">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ButtonsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Buttons</h2>
        <p className="text-gray-600 mb-8">
          Clear visual hierarchy through variants. Accessible by default.
        </p>
      </div>

      {/* Variants */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Variants</h3>
        <div className="flex flex-wrap gap-4 p-6 bg-gray-50 rounded-lg">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4 p-6 bg-gray-50 rounded-lg">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">States</h3>
        <div className="flex flex-wrap gap-4 p-6 bg-gray-50 rounded-lg">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      {/* All Combinations */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">All Combinations</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Variant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Small</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Default</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Large</th>
              </tr>
            </thead>
            <tbody>
              {(['default', 'outline', 'ghost', 'destructive'] as const).map(variant => (
                <tr key={variant} className="border-b border-gray-100">
                  <td className="py-4 px-4 text-sm text-gray-600 capitalize">{variant}</td>
                  <td className="py-4 px-4"><Button variant={variant} size="sm">Button</Button></td>
                  <td className="py-4 px-4"><Button variant={variant} size="default">Button</Button></td>
                  <td className="py-4 px-4"><Button variant={variant} size="lg">Button</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function PatternsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Common Patterns</h2>
        <p className="text-gray-600 mb-8">
          Ready-to-use UI patterns for AI applications.
        </p>
      </div>

      {/* Card Pattern */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Card</h3>
        <div className="max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h4>
            <p className="text-gray-600 mb-4">
              This is a standard card component with proper spacing and visual hierarchy.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Primary Action</Button>
              <Button variant="outline" size="sm">Secondary</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bubble Pattern */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Chat Interface</h3>
        <div className="max-w-2xl space-y-4 p-6 bg-gray-50 rounded-lg">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-primary-500 text-white rounded-2xl rounded-br-md px-4 py-3">
              <p>How do I use this design system?</p>
            </div>
          </div>
          {/* AI Response */}
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium flex-shrink-0">
              AI
            </div>
            <div className="max-w-[80%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
              <p className="text-gray-700">
                Install the packages with npm or pnpm, then import the Tailwind preset and components.
                The design system follows a white/gray foundation with cool blue accents.
              </p>
            </div>
          </div>
          {/* User Message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-primary-500 text-white rounded-2xl rounded-br-md px-4 py-3">
              <p>Thanks! That's helpful.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Pattern */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Form</h3>
        <div className="max-w-md p-6 bg-gray-50 rounded-lg">
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Your message..."
              />
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </div>
      </div>

      {/* Loading States */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Loading States</h3>
        <div className="flex gap-8 p-6 bg-gray-50 rounded-lg">
          {/* Spinner */}
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Spinner</p>
          </div>
          {/* Skeleton */}
          <div className="text-center">
            <div className="space-y-2 mb-2">
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <p className="text-sm text-gray-500">Skeleton</p>
          </div>
          {/* Dots */}
          <div className="text-center">
            <div className="flex gap-1 justify-center mb-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-sm text-gray-500">Dots</p>
          </div>
        </div>
      </div>

      {/* Alert/Status Pattern */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status Messages</h3>
        <div className="space-y-3 max-w-lg">
          <div className="flex items-center gap-3 p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
            <p className="text-success-800">Operation completed successfully.</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="w-5 h-5 bg-warning-500 rounded-full flex items-center justify-center text-white text-xs">!</div>
            <p className="text-warning-800">Please review before continuing.</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="w-5 h-5 bg-error-500 rounded-full flex items-center justify-center text-white text-xs">×</div>
            <p className="text-error-800">An error occurred. Please try again.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
