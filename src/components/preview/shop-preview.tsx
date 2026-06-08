import { ShoppingBag, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { Panel } from '../ui/panel'

const PRODUCTS = [
  {
    title: 'Trail Jacket',
    price: '$129',
    rating: '4.8',
    color: 'Sand',
  },
  {
    title: 'Utility Backpack',
    price: '$89',
    rating: '4.7',
    color: 'Graphite',
  },
  {
    title: 'Weekend Sneakers',
    price: '$119',
    rating: '4.9',
    color: 'Cloud',
  },
  {
    title: 'Commuter Bottle',
    price: '$39',
    rating: '4.6',
    color: 'Mist',
  },
]

export function ShopPreview() {
  return (
    <section className="flex-1">
      <Panel className="overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--builder-border)] bg-[var(--builder-menu)] px-4 py-3 text-[var(--builder-menu-text)] md:px-6">
          <div
            className="text-lg"
            style={{ fontFamily: 'var(--builder-heading-font)' }}
          >
            Northlane Market
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <a href="#" className="rounded-full px-3 py-1 hover:bg-white/10">
              New
            </a>
            <a href="#" className="rounded-full px-3 py-1 hover:bg-white/10">
              Shop
            </a>
            <a href="#" className="rounded-full px-3 py-1 hover:bg-white/10">
              Story
            </a>
          </nav>
          <button className="inline-flex items-center gap-2 rounded-full bg-[var(--builder-menu-accent)] px-3 py-1.5 text-sm font-medium text-[var(--builder-menu-accent-text)]">
            <ShoppingBag className="h-4 w-4" />
            Cart (2)
          </button>
        </header>

        <div className="space-y-5 p-4 md:p-6">
          <section className="grid gap-4 rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[linear-gradient(135deg,var(--builder-accent-soft),transparent_65%)] p-5 md:grid-cols-[1.2fr_1fr] md:p-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--builder-muted-text)]">
                Summer Collection
              </p>
              <h2
                className="text-3xl text-[var(--builder-text)] md:text-4xl"
                style={{ fontFamily: 'var(--builder-heading-font)' }}
              >
                Looks built for movement.
              </h2>
              <p className="max-w-xl text-sm text-[var(--builder-muted-text)] md:text-base">
                Create a bold, breathable storefront style with one click.
                Tweak colors and typography, then share your exact theme by URL.
              </p>
              <div className="flex gap-3">
                <Button>Shop now</Button>
                <Button variant="secondary">Preview lookbook</Button>
              </div>
            </div>
            <div className="rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--builder-muted-text)]">
                Feature
              </p>
              <h3
                className="mt-2 text-2xl text-[var(--builder-text)]"
                style={{ fontFamily: 'var(--builder-heading-font)' }}
              >
                Alpine Field Pack
              </h3>
              <p className="mt-3 text-sm text-[var(--builder-muted-text)]">
                Weatherproof shell, modular interior, and a silhouette tuned for
                daily carry.
              </p>
              <div className="mt-6 flex items-end justify-between">
                <span className="text-2xl font-semibold text-[var(--builder-text)]">
                  $149
                </span>
                <Button size="sm">Add to cart</Button>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3
                className="text-2xl text-[var(--builder-text)]"
                style={{ fontFamily: 'var(--builder-heading-font)' }}
              >
                Featured products
              </h3>
              <a
                href="#"
                className="text-sm font-medium text-[var(--builder-accent)] hover:underline"
              >
                Browse all
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {PRODUCTS.map((product) => (
                <article
                  key={product.title}
                  className="rounded-[var(--builder-radius)] border border-[var(--builder-border)] bg-[var(--builder-surface)] p-4"
                >
                  <div className="mb-3 h-28 rounded-[calc(var(--builder-radius)-2px)] bg-[linear-gradient(135deg,var(--builder-accent-soft),var(--builder-surface))]" />
                  <h4
                    className="text-lg text-[var(--builder-text)]"
                    style={{ fontFamily: 'var(--builder-heading-font)' }}
                  >
                    {product.title}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--builder-muted-text)]">
                    Color: {product.color}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-[var(--builder-text)]">
                      {product.price}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--builder-accent-soft)] px-2 py-1 text-xs font-medium text-[var(--builder-accent-text)]">
                      <Star className="h-3.5 w-3.5" />
                      {product.rating}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Panel>
    </section>
  )
}
