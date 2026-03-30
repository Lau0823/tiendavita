"use client";

import { useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Sparkles,
  Ruler,
  HeartHandshake,
  Minus,
  Plus,
  LogIn,
  MessageCircle,
} from "lucide-react";

type ProductPhoto = {
  id: number;
  image: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);

  const accent = "#8E6AAE";
  const accentDark = "#765392";
  const accentSoft = "#F3ECF8";
  const whatsappColor = "#25D366";
  const whatsappHover = "#1ebe5d";

  const whatsappPhone = "573115813054"; // Cambia por tu número real
  const whatsappMessage =
    "Hola, quiero comprar la Faja Moldeadora Premium. ¿Está disponible?";

  const benefits = [
    "Moldea tu cintura",
    "Ajuste cómodo",
    "Realza tu figura",
    "Ideal para uso diario",
    "Material transpirable",
    "Más seguridad en ti",
  ];

  const productPhotos: ProductPhoto[] = useMemo(
    () => [
      {
        id: 1,
        image: "/17018732871701873287Body Reloj de Arena 1.jpg",
      },
      {
        id: 2,
        image: "/17018732871701873287Body Reloj 2.jpeg",
      },
      {
        id: 3,
        image: "/17018732871701873287Body Reloj 3.jpeg",
      },
      {
        id: 4,
        image: "/17018732871701873287Body Reloj 1.jpeg",
      },
    ],
    []
  );

  const faqItems: FaqItem[] = [
    {
      question: "¿Cómo sé cuál es mi talla?",
      answer:
        "Te recomendamos revisar la guía de tallas y comparar tus medidas antes de comprar.",
    },
    {
      question: "¿La faja se marca debajo de la ropa?",
      answer:
        "Está diseñada para verse lo más discreta posible bajo vestidos, jeans y prendas ajustadas.",
    },
    {
      question: "¿Puedo usarla todos los días?",
      answer:
        "Sí, su diseño está pensado para acompañarte con comodidad en el uso diario.",
    },
    {
      question: "¿Qué tipo de ajuste ofrece?",
      answer:
        "Brinda un ajuste firme, cómodo y estilizado para resaltar mejor la silueta.",
    },
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === productPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? productPhotos.length - 1 : prev - 1
    );
  };

  const scrollMobileGallery = (direction: "left" | "right") => {
    if (!mobileCarouselRef.current) return;

    const card = mobileCarouselRef.current.querySelector(
      "[data-gallery-card]"
    ) as HTMLElement | null;

    const amount = card ? card.offsetWidth + 16 : 320;

    mobileCarouselRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const buyOnWhatsApp = () => {
    const message = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappPhone}?text=${message}`, "_blank");
  };

  return (
    <>
      <main className="bg-white text-black">
        {/* Top bar */}
        <div
          className="px-4 py-3 text-center text-sm font-semibold tracking-wide text-white"
          style={{ backgroundColor: accent }}
        >
          ENVÍO GRATIS A TODO EL PAÍS
        </div>

        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <a href="#inicio" className="text-3xl font-bold tracking-tight">
              Faja<span style={{ color: accent }}>Fit</span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#inicio"
                className="text-sm font-medium transition duration-300 hover:opacity-70"
              >
                Inicio
              </a>
              <a
                href="#beneficios"
                className="text-sm font-medium transition duration-300 hover:opacity-70"
              >
                Beneficios
              </a>
              <a
                href="#producto"
                className="text-sm font-medium transition duration-300 hover:opacity-70"
              >
                Producto
              </a>
              <a
                href="#faq"
                className="text-sm font-medium transition duration-300 hover:opacity-70"
              >
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                <LogIn className="h-4 w-4" />
                Login
              </a>

              <button
                aria-label="Carrito"
                className="relative rounded-full border border-neutral-300 p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-50"
              >
                <ShoppingCart className="h-5 w-5" />
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  {cartCount}
                </span>
              </button>

              <button
                className="rounded-full border border-neutral-300 p-3 transition duration-300 md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
              <nav className="flex flex-col gap-4">
                <a href="#inicio" onClick={() => setMenuOpen(false)}>
                  Inicio
                </a>
                <a href="#beneficios" onClick={() => setMenuOpen(false)}>
                  Beneficios
                </a>
                <a href="#producto" onClick={() => setMenuOpen(false)}>
                  Producto
                </a>
                <a href="#faq" onClick={() => setMenuOpen(false)}>
                  FAQ
                </a>
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </a>
              </nav>
            </div>
          )}
        </header>

        {/* Hero */}
        <section
          id="inicio"
          className="relative flex min-h-[88vh] items-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/17018732871701873287Body Reloj de Arena 1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
            <div className="max-w-xl text-white">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <Star className="mr-2 h-4 w-4 fill-current" />
                Ajuste cómodo + envío gratis
              </div>

              <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Define tu figura con estilo
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/90 sm:text-lg">
                Faja moldeadora premium con ajuste cómodo y diseño pensado para
                resaltar tu silueta.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={buyOnWhatsApp}
                  className="inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{ backgroundColor: whatsappColor }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = whatsappHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = whatsappColor)
                  }
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Comprar por WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition duration-300 hover:bg-white hover:text-black"
                >
                  <Ruler className="mr-2 h-4 w-4" />
                  Ver tallas
                </button>
              </div>
            </div>

            <div />
          </div>
        </section>

        {/* Trust */}
        <section className="border-b border-neutral-200 bg-white px-4 py-6 md:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <ShieldCheck className="h-5 w-5" style={{ color: accent }} />
              <div>
                <p className="font-semibold">Compra fácil</p>
                <p className="text-sm text-neutral-600">
                  Atención rápida por WhatsApp
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <Sparkles className="h-5 w-5" style={{ color: accent }} />
              <div>
                <p className="font-semibold">Diseño discreto</p>
                <p className="text-sm text-neutral-600">
                  Ajuste suave bajo la ropa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <HeartHandshake className="h-5 w-5" style={{ color: accent }} />
              <div>
                <p className="font-semibold">Más seguridad</p>
                <p className="text-sm text-neutral-600">
                  Resalta tu figura con comodidad
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits marquee */}
        <section
          id="beneficios"
          className="overflow-hidden py-5"
          style={{ backgroundColor: accent }}
        >
          <div className="marquee whitespace-nowrap">
            {[...benefits, ...benefits].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="mx-6 inline-flex items-center text-sm font-bold uppercase tracking-[0.12em] text-white sm:text-base"
              >
                <CheckCircle2 className="mr-3 h-4 w-4" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Product section */}
        <section id="producto" className="px-4 py-20 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                Producto destacado
              </p>
              <h2 className="mt-2 text-4xl font-bold">
                
              </h2>
              <p className="mt-3 max-w-2xl text-neutral-600">
                
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Mobile gallery */}
              <div className="lg:hidden">
                <div
                  ref={mobileCarouselRef}
                  className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth"
                >
                  {productPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      data-gallery-card
                      className="w-[88%] min-w-[88%] snap-center"
                    >
                      <article className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-lg">
                        <div
                          className="h-[460px] w-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${photo.image}')` }}
                        />

                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black backdrop-blur">
                          Foto {index + 1}
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <button
                            onClick={() => scrollMobileGallery("left")}
                            className="rounded-full bg-white/90 p-3 text-black shadow-lg backdrop-blur transition duration-300 hover:scale-105"
                            aria-label="Foto anterior"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>

                          <button
                            onClick={() => scrollMobileGallery("right")}
                            className="rounded-full bg-white/90 p-3 text-black shadow-lg backdrop-blur transition duration-300 hover:scale-105"
                            aria-label="Foto siguiente"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop gallery */}
              <div className="hidden lg:block">
                <article className="relative overflow-hidden rounded-[36px] border border-neutral-200 bg-white shadow-lg">
                  <div
                    className="h-[760px] w-full bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `url('${productPhotos[currentPhotoIndex].image}')`,
                    }}
                  />

                  <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black backdrop-blur">
                    Foto {currentPhotoIndex + 1} de {productPhotos.length}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <button
                      onClick={prevPhoto}
                      className="rounded-full bg-white/90 p-4 text-black shadow-lg backdrop-blur transition duration-300 hover:scale-105"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={nextPhoto}
                      className="rounded-full bg-white/90 p-4 text-black shadow-lg backdrop-blur transition duration-300 hover:scale-105"
                      aria-label="Foto siguiente"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </article>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  {productPhotos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 ${
                        currentPhotoIndex === index
                          ? "scale-[1.02]"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        borderColor:
                          currentPhotoIndex === index ? accent : "#e5e5e5",
                        boxShadow:
                          currentPhotoIndex === index
                            ? "0 12px 30px rgba(142, 106, 174, 0.24)"
                            : undefined,
                      }}
                    >
                      <div
                        className="h-28 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${photo.image}')` }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-lg">
                <span
                  className="inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white"
                  style={{ backgroundColor: accent }}
                >
                  Bestseller
                </span>

                <h3 className="mt-5 text-4xl font-bold">
                  Faja Moldeadora Premium
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <p
                    className="text-3xl font-extrabold"
                    style={{ color: accent }}
                  >
                    $149.900
                  </p>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                    Envío gratis
                  </span>
                </div>

                <p className="mt-6 text-base leading-7 text-neutral-600">
                  Diseñada para estilizar la silueta sin sacrificar comodidad.
                  Su ajuste firme y su material suave ayudan a realzar tu figura
                  con un acabado elegante.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <p className="text-sm font-semibold text-neutral-500">
                      Tallas disponibles
                    </p>
                    <p className="mt-1 font-bold">S · M · L · XL</p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <p className="text-sm font-semibold text-neutral-500">
                      Material
                    </p>
                    <p className="mt-1 font-bold">
                      Suave, transpirable y cómodo
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <p className="text-sm font-semibold text-neutral-500">
                      Ideal para
                    </p>
                    <p className="mt-1 font-bold">
                      Uso diario, vestidos y jeans
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <button
                    onClick={buyOnWhatsApp}
                    className="inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                    style={{ backgroundColor: whatsappColor }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = whatsappHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = whatsappColor)
                    }
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Comprar por WhatsApp
                  </button>

                  <button
                    onClick={addToCart}
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-6 py-4 text-sm font-bold transition duration-300 hover:bg-neutral-50"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isAdded ? "Agregado al carrito" : "Agregar al carrito"}
                  </button>

                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-6 py-4 text-sm font-bold transition duration-300 hover:bg-neutral-50"
                  >
                    <Ruler className="mr-2 h-4 w-4" />
                    Ver guía de tallas
                  </button>
                </div>

                <div className="mt-8 space-y-4 border-t border-neutral-200 pt-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: accent }}
                    />
                    <p className="text-sm leading-6 text-neutral-600">
                      Moldea la cintura con un contorno más definido.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: accent }}
                    />
                    <p className="text-sm leading-6 text-neutral-600">
                      Ajuste cómodo para acompañarte durante el día.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: accent }}
                    />
                    <p className="text-sm leading-6 text-neutral-600">
                      Diseño pensado para realzar tu figura con estilo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="px-4 py-16 md:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                Opinión de clienta
              </p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current"
                    style={{ color: accent }}
                  />
                ))}
              </div>
              <p className="mt-4 text-lg leading-8 text-neutral-700">
                “Me encantó porque estiliza muy bonito la figura y se siente
                cómoda para usar con diferentes outfits.”
              </p>
            </div>

            <div
              className="rounded-[28px] p-8 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: accent }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                Estilo y comodidad
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                Una faja diseñada para acompañarte
              </h3>
              <p className="mt-4 leading-7 text-white/90">
                Ajuste cómodo, diseño discreto y una silueta más estilizada para
                complementar tu look todos los días.
              </p>
              <button
                onClick={buyOnWhatsApp}
                className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-4 text-sm font-bold text-black transition duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Pedir por WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Article */}
        <section
          id="articulo"
          className="px-4 py-20 md:px-6"
          style={{ backgroundColor: accentSoft }}
        >
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            <div className="rounded-[32px] bg-white p-8 shadow-lg">
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                Guía rápida
              </p>
              <h2 className="mt-3 text-4xl font-bold">
                Cómo usar una faja correctamente
              </h2>

              <div className="mt-8 space-y-6 text-neutral-700">
                <div>
                  <h3 className="font-semibold">1. Revisa tu talla</h3>
                  <p className="mt-2 leading-7">
                    Comparar tus medidas ayuda a elegir un mejor ajuste.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">2. Acomódala con calma</h3>
                  <p className="mt-2 leading-7">
                    Colócala suavemente para que se adapte mejor a tu cuerpo.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">3. Combínala con tu look</h3>
                  <p className="mt-2 leading-7">
                    Ideal para outfits casuales, elegantes y de uso diario.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col justify-center rounded-[32px] p-8 text-white shadow-lg"
              style={{ backgroundColor: accent }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                Beneficios
              </p>
              <h3 className="mt-3 text-4xl font-bold">
                Seguridad, soporte y estilo
              </h3>
              <p className="mt-5 leading-7 text-white/90">
                La faja ayuda a definir la figura con una sensación cómoda y un
                diseño pensado para estilizar la silueta desde el primer uso.
              </p>

              <button
                onClick={buyOnWhatsApp}
                className="mt-8 inline-flex w-fit items-center rounded-full bg-white px-6 py-4 text-sm font-bold text-black transition duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Comprar por WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-20 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                Preguntas frecuentes
              </p>
              <h2 className="mt-3 text-4xl font-bold">
                Resolvemos tus dudas antes de comprar
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={item.question}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-semibold">{item.question}</span>
                      {isOpen ? (
                        <Minus className="h-5 w-5" style={{ color: accent }} />
                      ) : (
                        <Plus className="h-5 w-5" style={{ color: accent }} />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-sm leading-7 text-neutral-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="border-t px-4 py-14 text-white md:px-6"
          style={{ backgroundColor: accent }}
        >
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-3xl font-bold">
                Faja<span className="text-white/80">Fit</span>
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
                Resalta tu figura con prendas diseñadas para brindar soporte,
                comodidad y estilo.
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
                  <a href="#beneficios" className="transition hover:text-white">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a href="#producto" className="transition hover:text-white">
                    Producto
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Ayuda</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                <li>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="transition hover:text-white"
                  >
                    Guía de tallas
                  </button>
                </li>
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
                  <span>hola@fajafit.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Bogotá, Colombia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
            <p>© 2026 FajaFit. Todos los derechos reservados.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="transition hover:text-white">
                Política de privacidad
              </a>
              <a href="#" className="transition hover:text-white">
                Cookies
              </a>
              <a href="#" className="transition hover:text-white">
                Soporte
              </a>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp */}
        <button
          onClick={buyOnWhatsApp}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:scale-105"
          style={{ backgroundColor: whatsappColor }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = whatsappHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = whatsappColor)
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
            animation: marquee 22s linear infinite;
          }

          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </main>

      {/* Modal guía de tallas */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-[rgba(142,106,174,0.22)] p-6 shadow-2xl backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5" />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                    Guía de tallas
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Encuentra tu ajuste ideal
                  </h3>
                </div>

                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="rounded-full border border-white/30 bg-white/10 p-2 text-white transition duration-300 hover:bg-white hover:text-black"
                  aria-label="Cerrar guía de tallas"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-white/85">
                Revisa las medidas y elige la talla que mejor se adapte a ti.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                <div className="grid grid-cols-3 bg-white/15 text-sm font-semibold text-white">
                  <div className="p-4">Talla</div>
                  <div className="p-4">Cintura</div>
                  <div className="p-4">Cadera</div>
                </div>

                {[
                  ["S", "60 - 68 cm", "86 - 94 cm"],
                  ["M", "69 - 76 cm", "95 - 102 cm"],
                  ["L", "77 - 84 cm", "103 - 110 cm"],
                  ["XL", "85 - 92 cm", "111 - 118 cm"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-3 border-t border-white/15 text-sm text-white/95"
                  >
                    <div className="p-4">{row[0]}</div>
                    <div className="p-4">{row[1]}</div>
                    <div className="p-4">{row[2]}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={buyOnWhatsApp}
                  className="inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-bold text-white transition duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: whatsappColor }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = whatsappHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = whatsappColor)
                  }
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Comprar por WhatsApp
                </button>

                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white transition duration-300 hover:bg-white hover:text-black"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}