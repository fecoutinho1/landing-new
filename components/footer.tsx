import { Cube, GithubLogo, TwitterLogo, DiscordLogo } from "@phosphor-icons/react/dist/ssr"

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-baltic-sea-200)] py-16">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand column */}
          <div className="lg:max-w-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-900)]">
                <Cube weight="fill" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-[var(--color-baltic-sea-800)]">Anchor</span>
            </div>
            <p className="mt-4 text-sm text-[var(--color-baltic-sea-500)]">
              Container infrastructure for the next generation of autonomous agents.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-200)] hover:border-[var(--color-accent-orange-400)] hover:bg-[var(--color-accent-orange-50)] transition-colors"
              >
                <GithubLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-200)] hover:border-[var(--color-accent-orange-400)] hover:bg-[var(--color-accent-orange-50)] transition-colors"
              >
                <TwitterLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-200)] hover:border-[var(--color-accent-orange-400)] hover:bg-[var(--color-accent-orange-50)] transition-colors"
              >
                <DiscordLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-16">
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-800)]">Product</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-800)]">Developers</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-800)]">Company</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-800)]">Legal</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-accent-orange-600)] transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-baltic-sea-200)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[var(--color-baltic-sea-500)]">© 2025 Anchor. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent-orange-500)] animate-pulse" />
            <span className="text-xs text-[var(--color-baltic-sea-500)]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
