"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Menu,
  X,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const heroSlides = [
  {
    image: "/embvit gotas.png",
    title: "EMBVIT",
    subtitle: "Nutrición de origen natural",
  },
  {
    image: "/hero.png",
    title: "EMBVIT",
    subtitle: "Compra fácil y directo",
  },
  {
    image: "/tratamiento.png",
    title: "EMBVIT",
    subtitle: "Elige tu producto hoy",
  },
  {
    image: "/shampo.png",
    title: "EMBVIT",
    subtitle: "Una rutina más simple",
  },
  {
    image: "/yogurt.png",
    title: "EMBVIT",
    subtitle: "Pídelo por WhatsApp",
  },
];

const products = [
  {
    id: 1,
    name: "EMBVIT",
    price: "$219.000",
    subtitle: "Caja con 20 tomas",
    image: "/hero.png",
    whatsappText: "Hola, quiero comprar EMBVIT.",
    badge: "Top ventas",
  },
  {
    id: 2,
    name: "shampoo",
    price: "$69.900",
    subtitle: "500 ml",
    image: "/shampo.png",
    whatsappText: "Hola, quiero comprar el Shampoo EMBRIOVIT.",
    badge: "Capilar",
  },
  {
    id: 3,
    name: "Tratamiento capilar",
    price: "$59.900",
    subtitle: "240 ml",
    image: "tratamiento.png",
    whatsappText: "Hola, quiero comprar el Tratamiento capilar EMBRIOVIT.",
    badge: "Favorito",
  },
];

const phrasesTop = [
  "COMPRA FÁCIL",
  "ATENCIÓN DIRECTA",
  "ENVÍO RÁPIDO",
  "PÍDELO HOY",
  "WHATSAPP DIRECTO",
];

const phrasesBottom = [
  "ELIGE TU FAVORITO",
  "COMPRA EN MINUTOS",
  "PAGO Y PEDIDO FÁCIL",
  "MENOS VUELTAS",
  "MÁS RÁPIDO",
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const accent = "#001d4a";
  const accentSoft = "#eef4fb";
  const ctaBlue = "#2f80ed";
  const ctaBlueHover = "#1f6fe0";

  const whatsappPhone = "573000000000"; // cambia por tu número real

  const buyOnWhatsApp = (text?: string) => {
    const msg = encodeURIComponent(
      text || "Hola, quiero comprar productos EMBVIT."
    );
    window.open(`https://wa.me/${whatsappPhone}?text=${msg}`, "_blank");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white text-black">
      {/* Top bar */}
      <div
        className="px-4 py-3 text-center text-[11px] font-semibold tracking-[0.18em] text-white sm:text-xs"
        style={{ backgroundColor: accent }}
      >
        EMBVIT · TIENDA DE VIDA
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <a
            href="#inicio"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            EMB<span style={{ color: accent }}>VIT</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#inicio"
              className="text-sm font-medium transition hover:opacity-70"
            >
              Inicio
            </a>
            <a
              href="#productos"
              className="text-sm font-medium transition hover:opacity-70"
            >
              Productos
            </a>
            <a
              href="#comprar"
              className="text-sm font-medium transition hover:opacity-70"
            >
              Comprar
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => buyOnWhatsApp()}
              className="hidden rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 md:inline-flex md:items-center"
              style={{ backgroundColor: ctaBlue }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = ctaBlueHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = ctaBlue)
              }
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Comprar
            </button>

            <button
              className="rounded-full border border-slate-300 p-3 transition md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a href="#inicio" onClick={() => setMenuOpen(false)}>
                Inicio
              </a>
              <a href="#productos" onClick={() => setMenuOpen(false)}>
                Productos
              </a>
              <a href="#comprar" onClick={() => setMenuOpen(false)}>
                Comprar
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO CAROUSEL CORREGIDO */}
      <section
        id="inicio"
        className="relative h-[78vh] min-h-[620px] overflow-hidden sm:h-[82vh] md:h-[88vh]"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-white">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-contain object-center md:object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent md:bg-black/25" />
          </div>
        ))}

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-end justify-center px-5 pb-16 sm:pb-20 md:items-center md:pb-0">
          <div className="max-w-xl text-center text-white">
            <h1 className="mt-3 text-4xl font-extrabold leading-none text-white/95 sm:text-6xl md:text-8xl">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/85 sm:text-sm md:text-base">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => buyOnWhatsApp()}
                className="inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                style={{ backgroundColor: ctaBlue }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = ctaBlueHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = ctaBlue)
                }
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Comprar ahora
              </button>

              <a
                href="#comprar"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition duration-300 hover:bg-white hover:text-black"
              >
                Ver productos
              </a>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-105 md:left-4"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-105 md:right-4"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2.5 bg-white/55"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Phrase carousel 1 */}
      <section
        className="overflow-hidden py-4"
        style={{ backgroundColor: accent }}
      >
        <div className="marquee whitespace-nowrap">
          {[...phrasesTop, ...phrasesTop].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-6 inline-flex items-center text-sm font-extrabold uppercase tracking-[0.25em] text-white sm:text-base"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Product cards */}
      <section
        id="comprar"
        className="px-4 py-14 md:px-6 md:py-20"
        style={{ backgroundColor: accentSoft }}
      >
        <div className="mx-auto max-w-7xl">
          <div id="productos" className="mb-8 text-center md:mb-10">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm"
              style={{ color: accent }}
            >
              Productos
            </p>
            <h2
              className="mt-3 text-3xl font-bold sm:text-4xl"
              style={{ color: accent }}
            >
              Elige y compra
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[30px] border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "#dbe7f6" }}
              >
                <div className="relative">
                  <div
                    className="h-[320px] w-full bg-cover bg-center sm:h-[380px]"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />

                  {product.badge && (
                    <span
                      className="absolute left-4 top-4 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm"
                      style={{ backgroundColor: accent }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <h3
                    className="text-xl font-bold leading-tight sm:text-2xl"
                    style={{ color: accent }}
                  >
                    {product.name}
                  </h3>

                  <p className="mt-3 text-2xl font-extrabold sm:text-3xl">
                    {product.price}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {product.subtitle}
                  </p>

                  <button
                    onClick={() => buyOnWhatsApp(product.whatsappText)}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
                    style={{ backgroundColor: ctaBlue }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = ctaBlueHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = ctaBlue)
                    }
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Comprar por WhatsApp
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Phrase carousel 2 */}
      <section
        className="overflow-hidden py-4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="marquee-reverse whitespace-nowrap">
          {[...phrasesBottom, ...phrasesBottom].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-6 inline-flex items-center text-sm font-extrabold uppercase tracking-[0.25em] sm:text-base"
              style={{ color: accent }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-4 py-14 md:px-6 md:py-20"
        style={{ backgroundColor: accent }}
      >
        <div className="mx-auto max-w-5xl text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 sm:text-sm">
            Último paso
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Si ya viste el producto, pídelo ahora
          </h2>

          <button
            onClick={() => buyOnWhatsApp()}
            className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
            style={{ backgroundColor: ctaBlue }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = ctaBlueHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = ctaBlue)
            }
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Comprar por WhatsApp
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-4 py-12 text-white md:px-6"
        style={{ backgroundColor: accent }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-3xl font-bold">
              EMB<span className="text-white/80">VIT</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
              Compra fácil y directa en Tienda de Vida.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="rounded-full border border-white/30 p-3 transition duration-300 hover:bg-white hover:text-black"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/30 p-3 transition duration-300 hover:bg-white hover:text-black"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/30 p-3 transition duration-300 hover:bg-white hover:text-black"
                aria-label="Correo"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Navegación</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li>
                <a href="#inicio" className="transition hover:text-white">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#productos" className="transition hover:text-white">
                  Productos
                </a>
              </li>
              <li>
                <a href="#comprar" className="transition hover:text-white">
                  Comprar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Ayuda</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li>
                <a href="#" className="transition hover:text-white">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Soporte
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Contacto</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>+57 300 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>hola@tiendadevida.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating button */}
      <button
        onClick={() => buyOnWhatsApp()}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:scale-105"
        style={{ backgroundColor: ctaBlue }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = ctaBlueHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = ctaBlue)
        }
        aria-label="Comprar por WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </button>

      <style jsx>{`
        .marquee {
          display: inline-block;
          min-width: 200%;
          animation: marquee 18s linear infinite;
        }

        .marquee-reverse {
          display: inline-block;
          min-width: 200%;
          animation: marqueeReverse 18s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </main>
  );
}