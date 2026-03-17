"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Wallet,
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

type Testimonial = {
  id: number;
  name: string;
  role: string;
  photo: string;
  text: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Embriovit Tratamiento Capilar",
    category: "Recuperación capilar",
    price: 89900,
    oldPrice: 119900,
    badge: "Más vendido",
    image: "/embvit.jpg",
    description:
      "Ayuda a fortalecer el folículo, reducir la caída y estimular el crecimiento del cabello.",
  },
  {
    id: 2,
    name: "Shampoo Embriovit",
    category: "Limpieza y nutrición",
    price: 54900,
    badge: "Nuevo",
    image: "/shampoojpg.jpg",
    description:
      "Limpieza suave que fortalece la raíz y mejora la salud del cuero cabelludo.",
  },
  {
    id: 3,
    name: "Kit Recuperación Total",
    category: "Tratamiento completo",
    price: 134900,
    oldPrice: 169900,
    badge: "Ahorra",
    image: "/tratamientocapilar.jpg",
    description:
      "Rutina completa para restaurar el cabello, mejorar su fuerza y recuperar su vitalidad.",
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

const heroSlides = [
  { id: 1, image: "/embvit.jpg" },
  { id: 2, image: "/shampoojpg.jpg" },
  { id: 3, image: "/tratamientocapilar.jpg" },
];

const gallerySlides = [
  {
    id: 1,
    image: "/embvit.jpg",
    title: "Tratamiento intensivo",
  },
  {
    id: 2,
    image: "/shampoojpg.jpg",
    title: "Limpieza fortalecedora",
  },
  {
    id: 3,
    image: "/tratamientocapilar.jpg",
    title: "Recuperación completa",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/736x/73/dd/61/73dd61c98ff9b3a9bb774b8d096b1ec0.jpg",
    title: "Nutrición avanzada",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María Fernanda",
    role: "Cliente",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    text: "Después de un proceso de salud difícil, mi cabello estaba muy débil. Embriovit me ayudó a verlo con más fuerza, brillo y vida.",
  },
  {
    id: 2,
    name: "Laura Sofía",
    role: "Cliente",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
    text: "Lo que más me gustó fue sentir una rutina de cuidado completa. Mi cuero cabelludo se siente mejor y mi cabello se ve más sano.",
  },
  {
    id: 3,
    name: "Paula Andrea",
    role: "Cliente",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    text: "Me encantó el tratamiento y el shampoo. Siento menos caída, más volumen y una textura mucho más bonita.",
  },
];

const benefits = [
  "Ayuda a fortalecer el folículo piloso.",
  "Apoya la disminución de la caída del cabello.",
  "Favorece el crecimiento de cabello nuevo.",
  "Mejora la textura y el brillo.",
  "Aporta nutrición y reparación intensiva.",
  "Ayuda a controlar el frizz y dar más volumen.",
];

const paymentMethods = [
  {
    title: "Tarjeta débito / crédito",
    text: "Paga de forma rápida y segura con tus tarjetas principales.",
    icon: CreditCard,
  },
  {
    title: "Transferencia",
    text: "Disponible para compras directas con confirmación rápida.",
    icon: Wallet,
  },
  {
    title: "Pago contra entrega",
    text: "Ideal para clientes que prefieren pagar al recibir.",
    icon: Truck,
  },
  {
    title: "Compra protegida",
    text: "Tus datos y tu pago viajan de forma segura.",
    icon: ShieldCheck,
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
  const [heroSlide, setHeroSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % gallerySlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

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
    <div className="min-h-screen bg-[#f7f8f2] text-[#17311b]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(167,183,70,0.10),transparent_18%),linear-gradient(180deg,#f7f8f2_0%,#eef3e4_42%,#f8faf5_100%)]" />

      <header className="sticky top-0 z-50 border-b border-[#dbe5cf] bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b] transition hover:bg-[#f3f6ec] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#inicio" className="text-sm text-[#17311b]/75 hover:text-[#17311b]">
              Inicio
            </a>
            <a href="#beneficios" className="text-sm text-[#17311b]/75 hover:text-[#17311b]">
              Beneficios
            </a>
            <a href="#galeria" className="text-sm text-[#17311b]/75 hover:text-[#17311b]">
              Galería
            </a>
            <a href="#testimonios" className="text-sm text-[#17311b]/75 hover:text-[#17311b]">
              Testimonios
            </a>
            <a href="#pagos" className="text-sm text-[#17311b]/75 hover:text-[#17311b]">
              Pagos
            </a>
            <a href="#tienda" className="text-sm text-[#17311b]/75 hover:text-[#17311b]">
              Tienda
            </a>
          </nav>

          <a href="#inicio" className="select-none text-center">
            <span className="block text-lg font-black tracking-[0.22em] text-[#17311b] sm:text-xl">
              TIENDA DE VITA
            </span>
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full bg-[#17311b] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#17311b]/15 transition hover:-translate-y-0.5 hover:bg-[#234826]"
          >
            <ShoppingCart className="h-4 w-4" />
            Carrito
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A7B746] px-1 text-[11px] font-bold text-[#17311b]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#dbe5cf] bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
              <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#17311b]/75">
                Inicio
              </a>
              <a href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#17311b]/75">
                Beneficios
              </a>
              <a href="#galeria" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#17311b]/75">
                Galería
              </a>
              <a href="#testimonios" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#17311b]/75">
                Testimonios
              </a>
              <a href="#pagos" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#17311b]/75">
                Pagos
              </a>
              <a href="#tienda" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#17311b]/75">
                Tienda
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="relative px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pb-14 lg:pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-[#dbe5cf] bg-white shadow-[0_30px_90px_rgba(22,43,22,0.10)]">
              <div className="relative h-[540px] sm:h-[620px] lg:h-[720px]">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={cn(
                      "absolute inset-0 transition-all duration-700",
                      heroSlide === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <img src={slide.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/35 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#17311b]/12 via-transparent to-transparent" />
                  </div>
                ))}

                <div className="absolute inset-0 z-10 flex flex-col justify-end">
                  <div className="mx-auto w-full max-w-7xl px-5 pb-6 sm:px-8 sm:pb-8 lg:px-12 lg:pb-10">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#41632E] shadow-sm backdrop-blur-md">
                        Bienestar y recuperación
                      </div>

                      <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#17311b] sm:text-5xl lg:text-6xl">
                      
                      </h1>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-[#17311b]/75 sm:text-base">
                        
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:max-w-xl sm:flex-row">
                      <a
                        href="#checkout"
                        className="flex-1 rounded-full bg-[#17311b] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-[#17311b]/15 transition hover:-translate-y-0.5 hover:bg-[#234826]"
                      >
                        Comprar ahora
                      </a>

                      <a
                        href="#tienda"
                        className="flex-1 rounded-full border border-[#17311b]/12 bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#17311b] transition hover:bg-[#f4f7ef]"
                      >
                        Ir a la tienda
                      </a>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {heroSlides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setHeroSlide(index)}
                            className={cn(
                              "h-2.5 rounded-full transition-all duration-300",
                              heroSlide === index
                                ? "w-8 bg-[#17311b]"
                                : "w-2.5 bg-[#17311b]/25 hover:bg-[#17311b]/45"
                            )}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                          }
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#17311b] shadow-sm backdrop-blur-md transition hover:bg-white"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() =>
                            setHeroSlide((prev) => (prev + 1) % heroSlides.length)
                          }
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#17311b] shadow-sm backdrop-blur-md transition hover:bg-white"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                Beneficios de Embriovit
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17311b] sm:text-4xl">
                Un apoyo integral para el fortalecimiento y la recuperación
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[1.75rem] border border-[#dbe5cf] bg-white p-6 shadow-[0_14px_40px_rgba(28,45,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(28,45,28,0.10)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A7B746] text-[#17311b] shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-base font-semibold leading-7 text-[#17311b]">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="galeria" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-[#dbe5cf] bg-white p-5 shadow-[0_18px_60px_rgba(28,45,28,0.06)] sm:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                  Galería
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#17311b] sm:text-4xl">
                  Conoce Embriovit más de cerca
                </h2>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() =>
                    setGallerySlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b] transition hover:bg-[#f4f7ef]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setGallerySlide((prev) => (prev + 1) % gallerySlides.length)
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b] transition hover:bg-[#f4f7ef]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="relative overflow-hidden rounded-[1.8rem]">
                <img
                  src={gallerySlides[gallerySlide].image}
                  alt={gallerySlides[gallerySlide].title}
                  className="h-[460px] w-full object-cover sm:h-[560px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17311b]/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-[#17311b] backdrop-blur">
                  {gallerySlides[gallerySlide].title}
                </div>
              </div>

              <div className="grid gap-4">
                {gallerySlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setGallerySlide(index)}
                    className={cn(
                      "group overflow-hidden rounded-[1.5rem] border bg-white text-left transition",
                      gallerySlide === index
                        ? "border-[#A7B746] shadow-[0_12px_35px_rgba(28,45,28,0.10)]"
                        : "border-[#dbe5cf] hover:border-[#A7B746]/60"
                    )}
                  >
                    <div className="flex items-center gap-4 p-3">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#17311b]">
                          {slide.title}
                        </p>
                        <p className="mt-1 text-sm text-[#17311b]/55">
                          Ver imagen
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-2 sm:hidden">
              <button
                onClick={() =>
                  setGallerySlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)
                }
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setGallerySlide((prev) => (prev + 1) % gallerySlides.length)
                }
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section id="testimonios" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                Testimonios
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17311b] sm:text-4xl">
                Historias de personas que confiaron en Embriovit
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border border-[#dbe5cf] bg-white p-8 shadow-[0_18px_60px_rgba(28,45,28,0.06)]">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[testimonialSlide].photo}
                    alt={testimonials[testimonialSlide].name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-bold text-[#17311b]">
                      {testimonials[testimonialSlide].name}
                    </p>
                    <p className="text-sm text-[#17311b]/55">
                      {testimonials[testimonialSlide].role}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-[#A7B746]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-xl font-medium leading-9 text-[#17311b] sm:text-2xl">
                  “{testimonials[testimonialSlide].text}”
                </p>

                <div className="mt-8 flex items-center gap-2">
                  <button
                    onClick={() =>
                      setTestimonialSlide(
                        (prev) => (prev - 1 + testimonials.length) % testimonials.length
                      )
                    }
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b] transition hover:bg-[#f4f7ef]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setTestimonialSlide((prev) => (prev + 1) % testimonials.length)
                    }
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] bg-white text-[#17311b] transition hover:bg-[#f4f7ef]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setTestimonialSlide(index)}
                    className={cn(
                      "rounded-[1.5rem] border bg-white p-4 text-left transition",
                      testimonialSlide === index
                        ? "border-[#A7B746] shadow-[0_12px_35px_rgba(28,45,28,0.10)]"
                        : "border-[#dbe5cf] hover:border-[#A7B746]/60"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-[#17311b]">{item.name}</p>
                        <p className="text-sm text-[#17311b]/55">{item.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#17311b]/68">
                      {item.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pagos" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-[#dbe5cf] bg-white p-6 shadow-[0_18px_60px_rgba(28,45,28,0.06)] sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                Pagos
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17311b] sm:text-4xl">
                Métodos de pago seguros y flexibles
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className="rounded-[1.75rem] border border-[#dbe5cf] bg-[#f8faf5] p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17311b] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#17311b]">
                      {method.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#17311b]/68">
                      {method.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="tienda" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                  Tienda
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#17311b] sm:text-4xl">
                  Productos destacados
                </h2>
              </div>

              <a
                href="#checkout"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17311b] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#234826]"
              >
                Ir a compra
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[2rem] border border-[#dbe5cf] bg-white p-4 shadow-[0_16px_50px_rgba(28,45,28,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_65px_rgba(28,45,28,0.12)]"
                >
                  <div className="relative overflow-hidden rounded-[1.6rem]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#A7B746] px-3 py-1 text-xs font-semibold text-[#17311b] shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#738D40]">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#17311b]">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#17311b]/68">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-end gap-3">
                      <span className="text-2xl font-black text-[#17311b]">
                        {currency.format(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-[#17311b]/35 line-through">
                          {currency.format(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 rounded-full border border-[#dbe5cf] bg-white px-4 py-3 text-sm font-semibold text-[#17311b] transition hover:bg-[#f4f7ef]"
                      >
                        Agregar
                      </button>
                      <a
                        href="#checkout"
                        onClick={() => addToCart(product)}
                        className="flex-1 rounded-full bg-[#17311b] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#234826]"
                      >
                        Comprar
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="checkout" className="px-4 py-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
            <div className="rounded-[2.25rem] border border-[#dbe5cf] bg-white p-8 shadow-[0_18px_60px_rgba(28,45,28,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                Compra
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17311b] sm:text-4xl">
                Elige tus productos y completa tu pedido
              </h2>
              <p className="mt-4 max-w-2xl text-[#17311b]/68">
                Una experiencia clara, segura y enfocada en ayudarte a comprar con confianza.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Compra segura",
                  "Atención personalizada",
                  "Envío rápido",
                  "Pago flexible",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#e4ead8] bg-[#f7f9f2] p-4 text-sm text-[#17311b]/78"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#738D40]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/573000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#17311b] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#234826]"
                >
                  Comprar por WhatsApp
                </a>

                <button
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-[#dbe5cf] bg-white px-6 py-3.5 text-sm font-semibold text-[#17311b] transition hover:bg-[#f4f7ef]"
                >
                  Ver carrito
                </button>
              </div>
            </div>

            <aside className="rounded-[2.25rem] border border-[#dbe5cf] bg-white p-6 shadow-[0_18px_60px_rgba(28,45,28,0.06)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                    Resumen
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-[#17311b]">
                    Tu pedido
                  </h3>
                </div>

                <div className="rounded-full bg-[#f4f7ef] px-4 py-2 text-sm font-semibold text-[#17311b]">
                  {cartCount} item{cartCount === 1 ? "" : "s"}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[#dbe5cf] bg-[#f8faf5] p-6 text-center text-sm text-[#17311b]/55">
                    Aún no has agregado productos. Empieza desde la tienda.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[1.5rem] border border-[#e4ead8] bg-[#f8faf5] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-[#17311b]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#17311b]/55">
                            {currency.format(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-[#dbe5cf] bg-white px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="rounded-full p-1 text-[#17311b] hover:bg-[#f4f7ef]"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-[#17311b]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="rounded-full p-1 text-[#17311b] hover:bg-[#f4f7ef]"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#e4ead8] bg-[#f8faf5] p-5">
                <div className="flex items-center justify-between text-sm text-[#17311b]/65">
                  <span>Subtotal</span>
                  <span>{currency.format(subtotal)}</span>
                </div>

                <div className="mt-4 border-t border-[#dbe5cf] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#17311b]">
                      Total estimado
                    </span>
                    <span className="text-2xl font-black text-[#17311b]">
                      {currency.format(subtotal)}
                    </span>
                  </div>
                </div>

                <button className="mt-5 w-full rounded-full bg-[#17311b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#234826]">
                  Continuar al pago
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dbe5cf] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#17311b]/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Tienda de Vita. Bienestar, recuperación y cuidado integral.</p>
          <div className="flex gap-5">
            <a href="#inicio" className="transition hover:text-[#17311b]">
              Inicio
            </a>
            <a href="#tienda" className="transition hover:text-[#17311b]">
              Tienda
            </a>
            <a href="#checkout" className="transition hover:text-[#17311b]">
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
            "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity",
            cartOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#dbe5cf] bg-white shadow-2xl transition-transform duration-300",
            cartOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-[#dbe5cf] px-6 py-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#738D40]">
                Carrito
              </p>
              <h3 className="mt-1 text-2xl font-black text-[#17311b]">
                Tus productos
              </h3>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe5cf] text-[#17311b]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {cart.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-[#dbe5cf] bg-[#f8faf5] p-6 text-center text-sm text-[#17311b]/55">
                Tu carrito está vacío. Agrega productos para continuar.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-[#e4ead8] bg-[#f8faf5] p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[#17311b]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-[#17311b]/55">
                          {currency.format(item.price)}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 rounded-full border border-[#dbe5cf] bg-white px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="rounded-full p-1 text-[#17311b] hover:bg-[#f4f7ef]"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold text-[#17311b]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="rounded-full p-1 text-[#17311b] hover:bg-[#f4f7ef]"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#17311b]">
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

          <div className="border-t border-[#dbe5cf] bg-[#f8faf5] px-6 py-6">
            <div className="mb-4 flex items-center justify-between text-sm text-[#17311b]/65">
              <span>Subtotal</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <button className="w-full rounded-full bg-[#17311b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#234826]">
              Ir al checkout
            </button>
          </div>
        </aside>
      </div>

      <a
        href="#checkout"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#17311b] px-6 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-105 hover:bg-[#234826]"
      >
        <ShoppingCart className="h-4 w-4" />
        Comprar
      </a>
    </div>
  );
}