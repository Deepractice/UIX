import { useState } from 'react'
import { colors, spacing, radius, shadows, typography, rational, sentient } from '@lucidui/tokens'
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
            <strong>Lucid</strong> 意为清晰、易懂、理性。在 AI 产品充斥着神秘主义和复杂性的时代,
            我们选择清晰作为指导原则。基于 shadcn/ui 的设计系统,我们提供双主题方案:
            理性蓝(Rational)代表效率、精准、计算;感性金(Sentient)代表智慧、思维、人文。
          </p>
          <blockquote className="border-l-4 border-rational-500 pl-6 my-6 text-gray-600 italic">
            "最好的界面会消失,让用户专注于真正重要的事情。"
          </blockquote>
        </div>
      </div>

      {/* Dual Theme System */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">双主题系统 Dual Theme System</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Rational Theme */}
          <div className="bg-gradient-to-br from-rational-50 to-rational-100 border-2 border-rational-300 rounded-xl p-8">
            <div className="w-16 h-16 bg-rational-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-rational-900 mb-3">Rational 理性蓝</h3>
            <p className="text-rational-700 mb-4">
              科技 · 效率 · 精准 · 计算
            </p>
            <div className="flex gap-2 mb-4">
              {([50, 100, 300, 500, 700, 900] as const).map(shade => (
                <div
                  key={shade}
                  className="w-8 h-8 rounded-md shadow"
                  style={{ backgroundColor: rational[shade] }}
                />
              ))}
            </div>
            <p className="text-sm text-rational-600">
              代表理性思考、精准计算、科技感。适用于数据分析、效率工具、技术产品。
            </p>
          </div>

          {/* Sentient Theme */}
          <div className="bg-gradient-to-br from-sentient-50 to-sentient-100 border-2 border-sentient-300 rounded-xl p-8">
            <div className="w-16 h-16 bg-sentient-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-2xl font-bold text-sentient-900 mb-3">Sentient 感性金</h3>
            <p className="text-sentient-700 mb-4">
              智慧 · 思维 · 人文 · 概率
            </p>
            <div className="flex gap-2 mb-4">
              {([50, 100, 300, 500, 700, 900] as const).map(shade => (
                <div
                  key={shade}
                  className="w-8 h-8 rounded-md shadow"
                  style={{ backgroundColor: sentient[shade] }}
                />
              ))}
            </div>
            <p className="text-sm text-sentient-600">
              代表感性思维、人文关怀、智慧洞察。适用于创意工具、人文产品、思考辅助。
            </p>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">核心原则 Core Principles</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚪</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">White Foundation</h3>
            <p className="text-gray-600 text-sm">
              白色为底,灰阶层级。为大众产品提供清晰的视觉基础,避免深色的小众感。
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Purple, No Black</h3>
            <p className="text-gray-600 text-sm">
              拒绝 AI 紫色的陈词滥调,避免深色主题的小众性。清晰胜过神秘。
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rational-500 to-sentient-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl text-white">⚖️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dual Modes</h3>
            <p className="text-gray-600 text-sm">
              理性与感性并存,科技与人文平衡,为不同场景提供合适的视觉语言。
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
          基于 shadcn/ui 的双主题色彩系统:理性蓝与感性金,白色基底,无紫色无黑色。
        </p>
      </div>

      {/* Dual Theme Comparison */}
      <div className="grid grid-cols-2 gap-8">
        {/* Rational Theme */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rational 理性蓝 - 科技·效率·精准</h3>
          <div className="grid grid-cols-6 gap-2">
            {([50, 100, 300, 500, 700, 900] as const).map(shade => (
              <div key={shade} className="text-center">
                <div
                  className="h-16 rounded-md border border-gray-200 mb-2 shadow-sm"
                  style={{ backgroundColor: rational[shade] }}
                />
                <p className="text-xs font-medium text-gray-700">{shade}</p>
                <p className="text-xs text-gray-500">{rational[shade].slice(0, 7)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-rational-50 border border-rational-200 rounded-lg">
            <p className="text-sm text-rational-700">
              主色调 <span className="font-mono font-semibold">{rational[500]}</span> -
              适用于数据分析、技术产品、效率工具
            </p>
          </div>
        </div>

        {/* Sentient Theme */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sentient 感性金 - 智慧·思维·人文</h3>
          <div className="grid grid-cols-6 gap-2">
            {([50, 100, 300, 500, 700, 900] as const).map(shade => (
              <div key={shade} className="text-center">
                <div
                  className="h-16 rounded-md border border-gray-200 mb-2 shadow-sm"
                  style={{ backgroundColor: sentient[shade] }}
                />
                <p className="text-xs font-medium text-gray-700">{shade}</p>
                <p className="text-xs text-gray-500">{sentient[shade].slice(0, 7)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-sentient-50 border border-sentient-200 rounded-lg">
            <p className="text-sm text-sentient-700">
              主色调 <span className="font-mono font-semibold">{sentient[500]}</span> -
              适用于创意工具、人文产品、思考辅助
            </p>
          </div>
        </div>
      </div>

      {/* Gray Scale - The Foundation */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gray Scale 灰阶 - 视觉基底</h3>
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
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            白色与灰阶构成视觉基底,为大众产品提供清晰的层级感,避免深色主题的小众性。
          </p>
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
              {([100, 300, 500, 700, 900] as const).map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-10 rounded border border-gray-200 mb-1"
                    style={{ backgroundColor: colors.success[shade] }}
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
              {([100, 300, 500, 700, 900] as const).map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-10 rounded border border-gray-200 mb-1"
                    style={{ backgroundColor: colors.warning[shade] }}
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
              {([100, 300, 500, 700, 900] as const).map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-10 rounded border border-gray-200 mb-1"
                    style={{ backgroundColor: colors.error[shade] }}
                  />
                  <p className="text-xs text-gray-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Examples - Dual Theme */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">应用示例 Live Examples</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Rational Example */}
          <div className="bg-gradient-to-br from-rational-50 to-white rounded-xl border-2 border-rational-200 p-6">
            <div className="bg-white rounded-lg border border-rational-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-rational-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  R
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rational Assistant</p>
                  <p className="text-sm text-gray-500">数据分析助手</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                为效率而生,精准计算,理性决策。适用于技术产品和数据分析场景。
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-rational-500 text-white text-sm rounded-md hover:bg-rational-600 transition-colors font-medium">
                  开始分析
                </button>
                <button className="px-3 py-1.5 border border-rational-300 text-rational-700 text-sm rounded-md hover:bg-rational-50 transition-colors">
                  查看数据
                </button>
              </div>
            </div>
          </div>

          {/* Sentient Example */}
          <div className="bg-gradient-to-br from-sentient-50 to-white rounded-xl border-2 border-sentient-200 p-6">
            <div className="bg-white rounded-lg border border-sentient-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sentient-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  S
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sentient Assistant</p>
                  <p className="text-sm text-gray-500">思维助手</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                激发灵感,探索思维,人文关怀。适用于创意工具和思考辅助场景。
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-sentient-500 text-white text-sm rounded-md hover:bg-sentient-600 transition-colors font-medium">
                  开始创作
                </button>
                <button className="px-3 py-1.5 border border-sentient-300 text-sentient-700 text-sm rounded-md hover:bg-sentient-50 transition-colors">
                  探索想法
                </button>
              </div>
            </div>
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
