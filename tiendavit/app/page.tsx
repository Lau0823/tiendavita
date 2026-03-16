"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  X,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  description: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: 1,
    name: "Embriovit Tratamiento Premium",
    category: "Reparación intensiva",
    price: 89900,
    oldPrice: 119900,
    badge: "Top ventas",
    image:
      "https://i.pinimg.com/736x/5a/7e/34/5a7e34cdfda4d7bbd0fc44f4307925fe.jpg",
    description:
      "Fórmula pensada para fuerza, brillo, nutrición y control del frizz.",
  },
  {
    id: 2,
    name: "Shampoo Embriovit",
    category: "Limpieza fortalecedora",
    price: 54900,
    badge: "Nuevo",
    image:
      "https://i.pinimg.com/736x/1d/11/94/1d11944beaf6e1a7d7c154d41346bab5.jpg",
    description:
      "Limpieza suave que acompaña rutinas enfocadas en crecimiento y volumen.",
  },
  {
    id: 3,
    name: "Kit Crecimiento Total",
    category: "Rutina completa",
    price: 134900,
    oldPrice: 169900,
    badge: "Ahorra 20%",
    image:
      "https://i.pinimg.com/736x/af/0b/1b/af0b1b7871cb8bb555325fc5d709ae13.jpg",
    description:
      "Tratamiento + shampoo + experiencia premium para una rutina integral.",
  },
  {
    id: 4,
    name: "Serum Nutri Raíz",
    category: "Cuidado avanzado",
    price: 72900,
    badge: "Glow",
    image:
      "https://i.pinimg.com/736x/73/dd/61/73dd61c98ff9b3a9bb774b8d096b1ec0.jpg",
    description:
      "Acompaña el ritual con una capa ligera de nutrición y acabado sedoso.",
  },
  {
    id: 5,
    name: "Ampolletas Revive",
    category: "Shock reparador",
    price: 67900,
    image:
      "https://i.pinimg.com/736x/74/5d/e4/745de4ce8ed50e5c63b49f51bfc5c22f.jpg",
    description:
      "Ideal para cabellos con daño visible, resequedad y falta de cuerpo.",
  },
  {
    id: 6,
    name: "Mascarilla Botanical Repair",
    category: "Nutrición profunda",
    price: 94900,
    image:
      "https://i.pinimg.com/736x/28/55/3b/28553b59c34531fedde9711f6d24c4ac.jpg",
    description:
      "Textura rica y premium para una experiencia de recuperación sensorial.",
  },
];

const testimonials = [
  {
    name: "Valentina R.",
    text: "La página se siente moderna, premium y natural. Desde que entré quise explorar todos los productos.",
  },
  {
    name: "Diana M.",
    text: "Me encantó la combinación verde con los acentos suaves. El catálogo se ve limpio y muy elegante.",
  },
  {
    name: "Paula G.",
    text: "Tiene ese estilo 2026 que queríamos: portada impactante, productos bonitos y experiencia fluida.",
  },
];

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (product: Product) => {
    setCartOpen(true);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#B0B996] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(167,183,70,0.16),transparent_20%),radial-gradient(circle_at_left,rgba(115,141,64,0.22),transparent_30%),linear-gradient(180deg,#0D330A_0%,#163b13_35%,#41632E_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D330A]/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#inicio"
              className="text-sm text-white/75 transition hover:text-white"
            >
              Inicio
            </a>
            <a
              href="#beneficios"
              className="text-sm text-white/75 transition hover:text-white"
            >
              Beneficios
            </a>
            <a
              href="#tienda"
              className="text-sm text-white/75 transition hover:text-white"
            >
              Tienda
            </a>
            <a
              href="#testimonios"
              className="text-sm text-white/75 transition hover:text-white"
            >
              Testimonios
            </a>
            <a
              href="#checkout"
              className="text-sm text-white/75 transition hover:text-white"
            >
              Comprar
            </a>
          </nav>

          <a href="#inicio" className="select-none text-center">
            <span className="block text-xl font-black tracking-[0.25em] text-white sm:text-2xl">
              TIENDA DE VITA
            </span>
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full bg-[#A7B746] px-5 py-2.5 text-sm font-semibold text-[#0D330A] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#b7c958]"
          >
            <ShoppingCart className="h-4 w-4" />
            Carrito
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-[#0D330A]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0D330A]/95 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/75"
              >
                Inicio
              </a>
              <a
                href="#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/75"
              >
                Beneficios
              </a>
              <a
                href="#tienda"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/75"
              >
                Tienda
              </a>
              <a
                href="#testimonios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/75"
              >
                Testimonios
              </a>
              <a
                href="#checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/75"
              >
                Comprar
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="inicio"
          className="relative overflow-hidden px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10"
        >
          <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/c5/55/e0/c555e0c2f67927c00d06d9061bfa769f.jpg')]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-white/10 bg-[url('https://i.pinimg.com/736x/c5/55/e0/c555e0c2f67927c00d06d9061bfa769f.jpg')] backdrop-blur-xl sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white/90">
                  <Sparkles className="h-4 w-4" />
                  Naturaleza, bienestar y diseño premium
                </div>

                <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Una portada bonita que abre paso a una tienda moderna y
                  elegante.
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                  Tienda de Vita combina una estética natural en verdes con una
                  experiencia de compra inmersiva: hero visual grande,
                  marketplace bonito, cards premium, hover suave y una interfaz
                  limpia pensada para vender.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#tienda"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A7B746] px-6 py-3.5 text-sm font-semibold text-[#0D330A] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#b7c958]"
                  >
                    Explorar tienda
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a
                    href="#beneficios"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Ver beneficios
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    ["100%", "Natural"],
                    ["2026", "Estilo web"],
                    ["Full", "Responsive"],
                  ].map(([value, label]) => (
                    <div
                      key={value + label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-center backdrop-blur-lg"
                    >
                      <p className="text-2xl font-black text-white sm:text-3xl">
                        {value}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/60">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[520px]">
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A7B746]/15 blur-3xl" />

                <div className="grid h-full grid-cols-2 gap-5">
                  {[products[0], products[2], products[1], products[3]].map(
                    (product, index) => (
                      <div
                        key={product.id}
                        className={cn(
                          "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-[#A7B746]/40 hover:bg-white/10",
                          index % 2 === 1 ? "mt-10" : "mt-0"
                        )}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-70" />

                        <div className="relative flex h-full flex-col">
                          <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#41632E]/20">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="mt-4 flex-1">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                              {product.category}
                            </p>
                            <h3 className="mt-2 text-lg font-bold leading-tight text-white">
                              {product.name}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-white/65">
                              {currency.format(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <button
                              onClick={() => addToCart(product)}
                              className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white transition hover:bg-white/15"
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </button>

                            <span className="rounded-full bg-[#B0B996] px-3 py-1 text-xs font-semibold text-[#0D330A]">
                              Vita
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="beneficios"
          className="px-4 py-8 sm:px-6 lg:px-8 lg:py-14"
        >
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Beneficios
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Una landing organizada, fresca y visualmente poderosa
              </h2>
              <p className="mt-4 text-white/70">
                Inspirada en el orden editorial de tus referencias, pero con una
                estética más moderna, limpia y pensada para una marca natural.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Portada impactante",
                  text: "Una primera pantalla con mucho protagonismo visual para enamorar desde el primer segundo.",
                },
                {
                  title: "Cards premium",
                  text: "Tarjetas elegantes con profundidad, bordes suaves y efectos hover modernos.",
                },
                {
                  title: "Tienda moderna",
                  text: "Catálogo limpio con estructura visual clara, pensado para explorar y comprar.",
                },
                {
                  title: "Responsive real",
                  text: "Diseño adaptable a móvil, tablet y desktop con una experiencia consistente.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-black/10 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A7B746] text-[#0D330A] shadow-lg shadow-black/20">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tienda" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                  Marketplace
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Productos destacados
                </h2>
              </div>

              <a
                href="#checkout"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A7B746] px-5 py-3 text-sm font-semibold text-[#0D330A] transition hover:-translate-y-0.5 hover:bg-[#b7c958]"
              >
                Ir a compra
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#A7B746]/40 hover:bg-white/10"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)] opacity-70" />

                  <div className="relative">
                    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#A7B746] px-3 py-1 text-xs font-semibold text-[#0D330A] shadow-lg">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/68">
                        {product.description}
                      </p>

                      <div className="mt-5 flex items-end gap-3">
                        <span className="text-2xl font-black text-white">
                          {currency.format(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-white/35 line-through">
                            {currency.format(product.oldPrice)}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                        >
                          Agregar
                        </button>
                        <a
                          href="#checkout"
                          onClick={() => addToCart(product)}
                          className="flex-1 rounded-full bg-[#A7B746] px-4 py-3 text-center text-sm font-semibold text-[#0D330A] transition hover:bg-[#b7c958]"
                        >
                          Comprar
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonios"
          className="px-4 py-8 sm:px-6 lg:px-8 lg:py-14"
        >
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                  Testimonios
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Una experiencia que se siente aspiracional
                </h2>
                <p className="mt-4 text-white/70">
                  Diseño bonito, organización clara y una sensación premium que
                  hace que la marca se vea más valiosa.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setActiveSlide(
                      (prev) => (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev + 1) % testimonials.length)
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="mb-6 flex items-center gap-1 text-[#A7B746]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <p className="text-2xl font-semibold leading-10 tracking-tight text-white sm:text-3xl">
                  “{testimonials[activeSlide].text}”
                </p>

                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                  {testimonials[activeSlide].name}
                </p>
              </div>

              <div className="grid gap-4">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveSlide(index)}
                    className={cn(
                      "rounded-[1.5rem] border p-5 text-left transition",
                      activeSlide === index
                        ? "border-[#A7B746]/40 bg-[#738D40]/30 text-white"
                        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    )}
                  >
                    <p className="font-semibold">{item.name}</p>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-6",
                        activeSlide === index ? "text-white/80" : "text-white/58"
                      )}
                    >
                      {item.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="checkout" className="px-4 py-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
            <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Comprar
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Un sitio bonito y listo para vender
              </h2>
              <p className="mt-4 max-w-2xl text-white/70">
                Esta base ya tiene hero, catálogo, carrito, testimonios,
                diseño responsive, efectos visuales y estructura lista para
                conectar checkout real, backend y analítica.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Diseño premium y natural",
                  "Responsive para todos los dispositivos",
                  "Catálogo moderno con hover",
                  "Carrito lateral y resumen de compra",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/75"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#A7B746]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/573000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#A7B746] px-6 py-3.5 text-sm font-semibold text-[#0D330A] transition hover:-translate-y-0.5 hover:bg-[#b7c958]"
                >
                  Comprar por WhatsApp
                </a>

                <button
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ver carrito
                </button>
              </div>
            </div>

            <aside className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                    Resumen
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    Tu pedido
                  </h3>
                </div>

                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  {cartCount} item{cartCount === 1 ? "" : "s"}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-6 text-center text-sm text-white/55">
                    Aún no has agregado productos. Empieza desde la tienda.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="mt-1 text-sm text-white/55">
                            {currency.format(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="rounded-full p-1 text-white hover:bg-white/10"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="rounded-full p-1 text-white hover:bg-white/10"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <div className="flex items-center justify-between text-sm text-white/65">
                  <span>Subtotal</span>
                  <span>{currency.format(subtotal)}</span>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Total estimado
                    </span>
                    <span className="text-2xl font-black text-white">
                      {currency.format(subtotal)}
                    </span>
                  </div>
                </div>

                <button className="mt-5 w-full rounded-full bg-[#A7B746] px-5 py-3 text-sm font-semibold text-[#0D330A] transition hover:bg-[#b7c958]">
                  Continuar al pago
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0D330A]/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Tienda de Vita. Diseño premium natural en Next.js + Tailwind.</p>
          <div className="flex gap-5">
            <a href="#inicio" className="transition hover:text-white">
              Inicio
            </a>
            <a href="#tienda" className="transition hover:text-white">
              Tienda
            </a>
            <a href="#checkout" className="transition hover:text-white">
              Checkout
            </a>
          </div>
        </div>
      </footer>

      <div
        className={cn(
          "fixed inset-0 z-50 transition",
          cartOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          onClick={() => setCartOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
            cartOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0D330A]/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300",
            cartOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Carrito
              </p>
              <h3 className="mt-1 text-2xl font-black text-white">
                Tus productos
              </h3>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {cart.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-white/55">
                Tu carrito está vacío. Agrega productos para continuar.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-white/55">
                          {currency.format(item.price)}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="rounded-full p-1 text-white hover:bg-white/10"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="rounded-full p-1 text-white hover:bg-white/10"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-white">
                            {currency.format(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-black/10 px-6 py-6">
            <div className="mb-4 flex items-center justify-between text-sm text-white/65">
              <span>Subtotal</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <button className="w-full rounded-full bg-[#A7B746] px-5 py-3 text-sm font-semibold text-[#0D330A] transition hover:bg-[#b7c958]">
              Ir al checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}