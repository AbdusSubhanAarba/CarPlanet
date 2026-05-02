import { supabase } from './supabaseClient'
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Heart,
  MapPin,
  Gauge,
  Calendar,
  Fuel,
  MessageCircle,
  Plus,
  Car,
  ShieldCheck,
  Users,
  Star,
  Camera,
  Upload,
  Menu,
  X,
  ChevronRight,
  Filter,
  Send,
  Bookmark,
  TrendingUp,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle2,
  Share2,
  Eye,
  User,
  Lock,
  Building2,
  Clock,
  ThumbsUp,
} from "lucide-react";

const cars = [
  {
    id: 1,
    title: "BMW 530i M Sport",
    brand: "BMW",
    model: "530i",
    year: 2019,
    price: 17800,
    mileage: 89000,
    location: "Manama, Bahrain",
    fuel: "Petrol",
    transmission: "Automatic",
    body: "Sedan",
    seller: "Ahmed Motors",
    sellerType: "Private Seller",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: ["Clean title", "Full option", "GCC specs"],
    description:
      "Clean BMW 530i M Sport with GCC specs, full option package, smooth automatic transmission, and excellent interior condition. Perfect daily luxury sedan.",
  },
  {
    id: 2,
    title: "Toyota Land Cruiser VXR",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2021,
    price: 52500,
    mileage: 43000,
    location: "Riffa, Bahrain",
    fuel: "Petrol",
    transmission: "Automatic",
    body: "SUV",
    seller: "GCC Auto House",
    sellerType: "Dealer",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1664277497095-424e085175e8?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1664277497095-424e085175e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: ["Warranty", "Dealer checked", "Family SUV"],
    description:
      "Premium Land Cruiser VXR, dealer checked, low mileage, family-ready SUV with strong resale value and excellent road presence.",
  },
  {
    id: 3,
    title: "Mercedes-Benz C300 AMG",
    brand: "Mercedes",
    model: "C300",
    year: 2020,
    price: 26300,
    mileage: 61000,
    location: "Muharraq, Bahrain",
    fuel: "Petrol",
    transmission: "Automatic",
    body: "Sedan",
    seller: "Sara Al Khalifa",
    sellerType: "Private Seller",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549927681-0b673b8243ab?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: ["AMG package", "Low mileage", "Premium interior"],
    description:
      "Elegant C300 AMG with premium interior, smooth ride, and low mileage. Great balance between luxury and performance.",
  },
  {
    id: 4,
    title: "Tesla Model 3 Long Range",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 31500,
    mileage: 28000,
    location: "Seef, Bahrain",
    fuel: "Electric",
    transmission: "Automatic",
    body: "Sedan",
    seller: "EV Bahrain",
    sellerType: "Dealer",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: ["EV", "Autopilot", "Fast charging"],
    description:
      "Long Range Model 3 with autopilot, clean interior, fast charging support, and excellent battery performance.",
  },
  {
    id: 5,
    title: "Ford Mustang GT",
    brand: "Ford",
    model: "Mustang",
    year: 2018,
    price: 22400,
    mileage: 76000,
    location: "Isa Town, Bahrain",
    fuel: "Petrol",
    transmission: "Manual",
    body: "Coupe",
    seller: "Omar Cars",
    sellerType: "Private Seller",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: ["V8", "Manual", "Performance"],
    description:
      "Mustang GT V8 manual. Loud, powerful, and exciting. Great option for performance car lovers.",
  },
  {
    id: 6,
    title: "Honda Civic Touring",
    brand: "Honda",
    model: "Civic",
    year: 2021,
    price: 14500,
    mileage: 52000,
    location: "Hamad Town, Bahrain",
    fuel: "Petrol",
    transmission: "Automatic",
    body: "Sedan",
    seller: "Yousef Ali",
    sellerType: "Private Seller",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: ["Economical", "Reliable", "Daily driver"],
    description:
      "Reliable Civic Touring, economical fuel consumption, clean interior, and excellent daily driver for city use.",
  },
];

const demoForums = [
  {
    id: 1,
    name: "BMW Owners Club",
    members: "18.2k",
    posts: "312 today",
    accent: "M Sport advice, maintenance, deals",
    description: "A community for BMW owners, buyers, and enthusiasts to discuss reliability, maintenance, trims, and used BMW deals.",
  },
  {
    id: 2,
    name: "Toyota Reliability",
    members: "26.8k",
    posts: "421 today",
    accent: "Land Cruiser, Camry, Corolla talk",
    description: "Talk about Toyota reliability, resale value, maintenance costs, and the best models for GCC roads.",
  },
  {
    id: 3,
    name: "First Car Advice",
    members: "41.5k",
    posts: "688 today",
    accent: "Ask before buying your first car",
    description: "New buyer questions, first car suggestions, budgeting, inspections, and deal checks.",
  },
  {
    id: 4,
    name: "GCC Car Market",
    members: "33.9k",
    posts: "510 today",
    accent: "Prices, specs, inspections, imports",
    description: "Discuss GCC specs, market prices, imports, inspections, and regional car buying advice.",
  },
];

const discussions = [
  { title: "Is a 2019 BMW 530i with 89k km a good deal?", forum: "BMW Owners Club", comments: 84, votes: 326 },
  { title: "Best SUV under $20k for Bahrain heat?", forum: "GCC Car Market", comments: 126, votes: 512 },
  { title: "What should I check before buying a used Mustang GT?", forum: "First Car Advice", comments: 57, votes: 211 },
];

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function Header({ activePage, navigate }) {
  const [open, setOpen] = useState(false);
  const nav = ["Marketplace", "Sell", "Forums", "Saved"];
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate("Marketplace")} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20"><Car size={24} /></div>
          <div className="text-left"><h1 className="text-xl font-black tracking-tight text-zinc-950">CarPlanet</h1><p className="text-xs font-medium text-zinc-500">Buy. Sell. Discuss.</p></div>
        </button>
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => (
            <button key={item} onClick={() => navigate(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${activePage === item ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"}`}>{item}</button>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={() => navigate("Auth")} className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-bold text-zinc-800 hover:bg-zinc-50">Sign in</button>
          <button onClick={() => navigate("Sell")} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-600/20 hover:bg-red-700">List your car</button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden"><div className="grid gap-2">{nav.map((item) => <button key={item} onClick={() => { navigate(item); setOpen(false); }} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold ${activePage === item ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-700"}`}>{item}</button>)}</div></div>}
    </header>
  );
}

function Hero({ navigate }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-32 top-20 hidden h-72 w-72 rounded-full bg-red-100 blur-3xl sm:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700"><TrendingUp size={16} /> Marketplace + car communities</div>
          <h2 className="max-w-3xl text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">Find your next car with people who actually know cars.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">Buy, sell, compare, and ask real car communities before making a decision. CarPlanet combines clean listings with Reddit-style forums for smarter car buying.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigate("Marketplace")} className="rounded-full bg-red-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-red-600/20 hover:bg-red-700">Browse cars</button>
            <button onClick={() => navigate("Forums")} className="rounded-full border border-zinc-300 px-7 py-4 text-sm font-black text-zinc-950 hover:bg-zinc-50">Join forums</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
          <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-3 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1400&auto=format&fit=crop" alt="Sports car" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
            <div className="mt-3 rounded-[1.5rem] bg-white p-5"><div className="flex items-center justify-between"><div><h3 className="text-xl font-black text-zinc-950">Ferrari Roma</h3><p className="text-sm font-semibold text-zinc-500">Community-rated hot deal</p></div><div className="rounded-full bg-red-600 px-4 py-2 text-sm font-black text-white">98%</div></div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SearchFilters({ filters, setFilters }) {
  const brands = ["All", "BMW", "Toyota", "Mercedes", "Tesla", "Ford", "Honda"];
  const bodies = ["All", "Sedan", "SUV", "Coupe"];
  return (
    <div className="rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_auto]">
        <label className="relative block"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} /><input value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} placeholder="Search make, model, keyword..." className="h-13 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-red-500 focus:bg-white" /></label>
        <select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} className="h-13 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold outline-none focus:border-red-500">{brands.map((brand) => <option key={brand}>{brand}</option>)}</select>
        <select value={filters.body} onChange={(e) => setFilters({ ...filters, body: e.target.value })} className="h-13 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold outline-none focus:border-red-500">{bodies.map((body) => <option key={body}>{body}</option>)}</select>
        <select value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="h-13 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold outline-none focus:border-red-500"><option value="999999">Any price</option><option value="15000">Under $15k</option><option value="25000">Under $25k</option><option value="40000">Under $40k</option><option value="60000">Under $60k</option></select>
        <button className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-black text-white hover:bg-zinc-800"><SlidersHorizontal size={18} /> Filters</button>
      </div>
    </div>
  );
}

function CarCard({ car, navigate, setSelectedCar }) {
  return (
    <motion.article layout className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden"><img src={car.image} alt={car.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-950 backdrop-blur hover:text-red-600"><Heart size={20} /></button>{car.verified && <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-red-600 backdrop-blur"><ShieldCheck size={15} /> Verified</div>}</div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-black text-zinc-950">{car.title}</h3><p className="mt-1 flex items-center gap-1 text-sm font-semibold text-zinc-500"><MapPin size={15} /> {car.location}</p></div><div className="text-right text-xl font-black text-red-600">{formatPrice(car.price)}</div></div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold text-zinc-600"><div className="rounded-2xl bg-zinc-50 p-3"><Calendar size={16} className="mb-1" />{car.year}</div><div className="rounded-2xl bg-zinc-50 p-3"><Gauge size={16} className="mb-1" />{car.mileage.toLocaleString()} km</div><div className="rounded-2xl bg-zinc-50 p-3"><Fuel size={16} className="mb-1" />{car.fuel}</div></div>
        <div className="mt-4 flex flex-wrap gap-2">{car.tags.map((tag) => <span key={tag} className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">{tag}</span>)}</div>
        <div className="mt-5 flex gap-3"><button onClick={() => { setSelectedCar(car); navigate("CarDetail"); }} className="flex-1 rounded-full bg-zinc-950 py-3 text-sm font-black text-white hover:bg-zinc-800">View details</button><button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:border-red-200 hover:text-red-600"><MessageCircle size={20} /></button></div>
      </div>
    </motion.article>
  );
}

function Marketplace({ cars, navigate, setSelectedCar }) {
  const [filters, setFilters] = useState({ query: "", brand: "All", body: "All", maxPrice: "999999" });
  const filteredCars = useMemo(() => cars.filter((car) => `${car.title} ${car.brand} ${car.model} ${car.tags.join(" ")}`.toLowerCase().includes(filters.query.toLowerCase()) && (filters.brand === "All" || car.brand === filters.brand) && (filters.body === "All" || car.body === filters.body) && car.price <= Number(filters.maxPrice)), [filters, cars]);
  return (
    <main className="bg-zinc-50"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h2 className="text-4xl font-black tracking-tight text-zinc-950">Marketplace</h2><p className="mt-2 text-zinc-600">Clean listings, powerful filters, trusted sellers.</p></div><div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-zinc-700 shadow-sm"><Filter size={17} /> {filteredCars.length} cars found</div></div><SearchFilters filters={filters} setFilters={setFilters} /><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filteredCars.map((car) => <CarCard key={car.id} car={car} navigate={navigate} setSelectedCar={setSelectedCar} />)}</div></div></main>
  );
}

function BackButton({ navigate, label = "Back" }) {
  return <button onClick={() => navigate("Marketplace")} className="mb-6 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-black text-zinc-700 hover:bg-zinc-50"><ArrowLeft size={17} /> {label}</button>;
}

function CarDetail({ car, navigate }) {
  const selected = car || cars[0];
  return (
    <main className="bg-zinc-50"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><BackButton navigate={navigate} label="Back to marketplace" />
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]"><section><div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm"><img src={selected.image} alt={selected.title} className="h-[480px] w-full object-cover" /><div className="grid grid-cols-3 gap-3 p-3">{selected.gallery.map((img) => <img key={img} src={img} className="h-32 w-full rounded-2xl object-cover" />)}</div></div>
        <div className="mt-6 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 md:flex-row"><div><h2 className="text-4xl font-black text-zinc-950">{selected.title}</h2><p className="mt-2 flex items-center gap-2 font-semibold text-zinc-500"><MapPin size={18} /> {selected.location}</p></div><div className="text-4xl font-black text-red-600">{formatPrice(selected.price)}</div></div><p className="mt-6 text-lg leading-8 text-zinc-600">{selected.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[Calendar, selected.year, "Year"], [Gauge, selected.mileage.toLocaleString() + " km", "Mileage"], [Fuel, selected.fuel, "Fuel"], [Car, selected.transmission, "Transmission"]].map(([Icon, value, label]) => <div key={label} className="rounded-3xl bg-zinc-50 p-5"><Icon className="mb-3 text-red-600" /><div className="text-lg font-black text-zinc-950">{value}</div><div className="text-sm font-bold text-zinc-500">{label}</div></div>)}</div></div></section>
        <aside className="space-y-5"><div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600"><User size={30} /></div><div><h3 className="text-xl font-black text-zinc-950">{selected.seller}</h3><p className="font-bold text-zinc-500">{selected.sellerType}</p></div></div>{selected.verified && <div className="mt-4 flex items-center gap-2 rounded-2xl bg-red-50 p-3 text-sm font-black text-red-700"><ShieldCheck size={18} /> Verified seller</div>}<div className="mt-5 grid gap-3"><button className="flex items-center justify-center gap-2 rounded-full bg-red-600 py-4 text-sm font-black text-white hover:bg-red-700"><Phone size={18} /> Call seller</button><button className="flex items-center justify-center gap-2 rounded-full bg-zinc-950 py-4 text-sm font-black text-white hover:bg-zinc-800"><MessageCircle size={18} /> Message seller</button><button onClick={() => navigate("SellerProfile")} className="rounded-full border border-zinc-200 py-4 text-sm font-black text-zinc-900 hover:bg-zinc-50">View seller profile</button></div></div><div className="rounded-[2rem] bg-zinc-950 p-6 text-white"><h3 className="text-2xl font-black">Ask the community</h3><p className="mt-2 text-sm leading-6 text-zinc-300">Post this listing into a forum and ask if it is a good deal before buying.</p><button onClick={() => navigate("ForumDetail")} className="mt-5 w-full rounded-full bg-white py-4 text-sm font-black text-zinc-950">Ask in forum</button></div></aside></div>
    </div></main>
  );
}

function SellerProfile({ car, navigate }) {
  const sellerCar = car || cars[0];
  const sellerCars = cars.filter((c) => c.sellerType === sellerCar.sellerType).slice(0, 3);
  return (
    <main className="bg-zinc-50"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><BackButton navigate={navigate} label="Back to marketplace" /><div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div className="flex items-center gap-5"><div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-red-50 text-red-600"><Building2 size={42} /></div><div><h2 className="text-4xl font-black text-zinc-950">{sellerCar.seller}</h2><p className="mt-1 font-bold text-zinc-500">{sellerCar.sellerType} • Member since 2023</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">Verified seller</span><span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-700">Fast replies</span><span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-700">12 active listings</span></div></div></div><div className="grid gap-3 sm:grid-cols-2"><button className="rounded-full bg-red-600 px-6 py-4 text-sm font-black text-white"><Phone size={17} className="mr-2 inline" /> Call</button><button className="rounded-full bg-zinc-950 px-6 py-4 text-sm font-black text-white"><Mail size={17} className="mr-2 inline" /> Email</button></div></div></div><div className="mt-8 grid gap-6 md:grid-cols-3">{[[Star, "4.9/5", "Seller rating"], [Eye, "18.4k", "Profile views"], [CheckCircle2, "97%", "Positive feedback"]].map(([Icon, value, label]) => <div key={label} className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><Icon className="mb-4 text-red-600" /><div className="text-3xl font-black text-zinc-950">{value}</div><div className="font-bold text-zinc-500">{label}</div></div>)}</div><h3 className="mt-10 text-3xl font-black text-zinc-950">Seller listings</h3><div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{sellerCars.map((c) => <CarCard key={c.id} car={c} navigate={navigate} setSelectedCar={() => {}} />)}</div></div></main>
  );
}

function Forums({ forums, navigate, setSelectedForum }) {  return (
    <main className="bg-zinc-50"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><section><h2 className="text-4xl font-black tracking-tight text-zinc-950">Car forums</h2><p className="mt-2 text-zinc-600">Join communities, ask before buying, and learn from real owners.</p><div className="mt-7 grid gap-4">{forums.map((forum) => <button key={forum.name} onClick={() => { setSelectedForum(forum); navigate("ForumDetail"); }} className="rounded-[2rem] border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600"><Users /></div><div><h3 className="text-lg font-black text-zinc-950">{forum.name}</h3><p className="text-sm font-semibold text-zinc-500">{forum.description}</p></div></div><ChevronRight className="text-zinc-400" /></div><div className="mt-4 flex gap-2 text-xs font-black text-zinc-600"><span className="rounded-full bg-zinc-100 px-3 py-1">{forum.members_count?.toLocaleString()} members</span><span className="rounded-full bg-red-50 px-3 py-1 text-red-700">Active forum</span></div></button>)}</div></section><TrendingDiscussions navigate={navigate} /></div></div></main>
  );
}

function TrendingDiscussions({ navigate }) {
  return <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h3 className="text-2xl font-black text-zinc-950">Trending discussions</h3><p className="text-sm font-semibold text-zinc-500">Community posts getting attention now.</p></div><button onClick={() => navigate("ForumDetail")} className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-black text-white">New post</button></div><div className="mt-6 grid gap-4">{discussions.map((post) => <article key={post.title} className="rounded-[1.5rem] border border-zinc-200 p-5 hover:border-red-200 hover:bg-red-50/30"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wide text-red-600">{post.forum}</p><h4 className="mt-1 text-lg font-black text-zinc-950">{post.title}</h4></div><Bookmark className="text-zinc-400" /></div><div className="mt-4 flex gap-3 text-sm font-bold text-zinc-600"><span className="flex items-center gap-1"><Star size={16} /> {post.votes} votes</span><span className="flex items-center gap-1"><MessageCircle size={16} /> {post.comments} comments</span></div></article>)}</div></section>;
}

function ForumDetail({ forum, navigate }) {
  const selected = forum || forums[0];
  return <main className="bg-zinc-50"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><button onClick={() => navigate("Forums")} className="mb-6 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-black text-zinc-700 hover:bg-zinc-50"><ArrowLeft size={17} /> Back to forums</button><section className="overflow-hidden rounded-[2rem] bg-zinc-950 text-white shadow-xl"><div className="p-8 md:p-10"><div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600"><Users size={34} /></div><h2 className="text-5xl font-black tracking-tight">{selected.name}</h2><p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">{selected.description}</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">{selected.members_count?.toLocaleString()} members</span><span className="rounded-full bg-red-600 px-4 py-2 text-sm font-black">Active forum</span></div></div></section><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr]"><section className="space-y-4">{discussions.map((post, index) => <article key={post.title} className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-black text-red-600">Posted {index + 1}h ago</p><h3 className="mt-2 text-2xl font-black text-zinc-950">{post.title}</h3><p className="mt-3 text-zinc-600">Looking for opinions from owners. Is this price fair and what issues should I check before buying?</p></div><Share2 className="text-zinc-400" /></div><div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-zinc-600"><span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1"><ThumbsUp size={16} /> {post.votes}</span><span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1"><MessageCircle size={16} /> {post.comments}</span><span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-red-700"><Clock size={16} /> Active now</span></div></article>)}</section><aside className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><h3 className="text-2xl font-black text-zinc-950">Create post</h3><p className="mt-1 text-sm font-semibold text-zinc-500">Ask the community anything.</p><input className="mt-5 h-13 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold outline-none focus:border-red-500" placeholder="Post title" /><textarea className="mt-3 h-32 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold outline-none focus:border-red-500" placeholder="Write your question..." /><button className="mt-4 w-full rounded-full bg-red-600 py-4 text-sm font-black text-white">Publish post</button></aside></div></div></main>;
}

function AuthPage({ navigate }) {
  const [mode, setMode] = useState("login");
  return <main className="min-h-[75vh] bg-zinc-50"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8"><section className="rounded-[2rem] bg-zinc-950 p-10 text-white"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600"><Car size={34} /></div><h2 className="mt-8 text-5xl font-black tracking-tight">Welcome to CarPlanet.</h2><p className="mt-5 text-lg leading-8 text-zinc-300">Create an account to save cars, list vehicles, message sellers, and join car communities.</p><div className="mt-8 grid gap-4">{["Save favorite listings", "Post cars for sale", "Join forums and comment"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-bold"><CheckCircle2 className="text-red-400" /> {item}</div>)}</div></section><section className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm"><div className="mb-6 flex rounded-full bg-zinc-100 p-1"><button onClick={() => setMode("login")} className={`flex-1 rounded-full py-3 text-sm font-black ${mode === "login" ? "bg-zinc-950 text-white" : "text-zinc-600"}`}>Login</button><button onClick={() => setMode("register")} className={`flex-1 rounded-full py-3 text-sm font-black ${mode === "register" ? "bg-red-600 text-white" : "text-zinc-600"}`}>Register</button></div><h3 className="text-3xl font-black text-zinc-950">{mode === "login" ? "Sign in" : "Create account"}</h3><p className="mt-1 font-semibold text-zinc-500">{mode === "login" ? "Continue to your account." : "Start buying, selling, and discussing cars."}</p><div className="mt-6 grid gap-4">{mode === "register" && <label className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={19} /><input className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 font-bold outline-none focus:border-red-500" placeholder="Full name" /></label>}<label className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={19} /><input className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 font-bold outline-none focus:border-red-500" placeholder="Email address" /></label><label className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={19} /><input type="password" className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 font-bold outline-none focus:border-red-500" placeholder="Password" /></label></div><button onClick={() => navigate("Marketplace")} className="mt-6 w-full rounded-full bg-red-600 py-4 text-sm font-black text-white shadow-lg shadow-red-600/20 hover:bg-red-700">{mode === "login" ? "Sign in" : "Create account"}</button><p className="mt-5 text-center text-sm font-semibold text-zinc-500">Demo screen only — real auth comes with Supabase.</p></section></div></main>;
}

function SellCar() {
  return <main className="bg-zinc-50"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div className="rounded-[2rem] bg-zinc-950 p-8 text-white"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600"><Plus size={28} /></div><h2 className="text-4xl font-black tracking-tight">Sell your car on CarPlanet.</h2><p className="mt-4 text-lg leading-8 text-zinc-300">Create a clean listing, upload photos, add service details, and let buyers ask the community before contacting you.</p></div><form className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"><h3 className="text-2xl font-black text-zinc-950">Create listing</h3><div className="mt-6 grid gap-4 md:grid-cols-2">{["Car make", "Model", "Year", "Mileage", "Price", "Location"].map((label) => <label key={label} className="grid gap-2"><span className="text-sm font-black text-zinc-800">{label}</span><input className="h-13 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-semibold outline-none focus:border-red-500 focus:bg-white" placeholder={label} /></label>)}</div><label className="mt-4 grid gap-2"><span className="text-sm font-black text-zinc-800">Description</span><textarea rows={5} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-semibold outline-none focus:border-red-500 focus:bg-white" placeholder="Condition, service history, accident history..." /></label><div className="mt-4 rounded-[1.5rem] border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center"><Upload className="mx-auto text-zinc-400" size={32} /><p className="mt-3 text-sm font-black text-zinc-800">Upload car photos</p></div><button type="button" className="mt-6 w-full rounded-full bg-red-600 py-4 text-sm font-black text-white shadow-lg shadow-red-600/20 hover:bg-red-700">Publish listing</button></form></div></main>;
}

function Saved({ cars, navigate, setSelectedCar }) {
  return <main className="bg-zinc-50"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><h2 className="text-4xl font-black tracking-tight text-zinc-950">Saved cars</h2><p className="mt-2 text-zinc-600">Your favorite cars and watched deals.</p><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{cars.slice(0, 3).map((car) => <CarCard key={car.id} car={car} navigate={navigate} setSelectedCar={setSelectedCar} />)}</div></div></main>;
}

function Footer() {
  return <footer className="border-t border-zinc-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-8 text-sm font-semibold text-zinc-500 sm:px-6 md:flex-row lg:px-8"><p>© 2026 CarPlanet. Built for smarter car buying.</p><div className="flex gap-5"><span>Privacy</span><span>Terms</span><span>Contact</span></div></div></footer>;
}

export default function CarPlanetApp() {
  
  const [activePage, setActivePage] = useState("Marketplace");
 const [carsData, setCarsData] = useState(cars);
const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [forumsData, setForumsData] = useState(demoForums);
const [selectedForum, setSelectedForum] = useState(demoForums[0]);
useEffect(() => {
  async function loadForums() {
    const { data, error } = await supabase
      .from('forums')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error loading forums:', error)
      return
    }

    setForumsData(data)
    setSelectedForum(data[0])
  }

  async function loadCars() {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error loading cars:', error)
      return
    }

    const formattedCars = data.map((car) => ({
      id: car.id,
      title: car.title,
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      location: car.location,
      fuel: car.fuel,
      transmission: car.transmission,
      body: car.body_type,
      seller: 'CarPlanet Seller',
      sellerType: 'Verified Seller',
      verified: car.is_verified,
      image: car.image_url,
      gallery: [car.image_url, car.image_url, car.image_url],
      tags: ['Supabase listing', car.fuel, car.body_type],
      description: car.description,
    }))

    setCarsData(formattedCars)
    setSelectedCar(formattedCars[0])
  }

  loadForums()
  loadCars()
}, [])
const navigate = (page) => {
  setActivePage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

return (
  <div className="min-h-screen bg-white font-sans text-zinc-950">
    <Header activePage={activePage} navigate={navigate} />

    {activePage === "Marketplace" && (
      <>
        <Hero navigate={navigate} />
        <Marketplace cars={carsData} navigate={navigate} setSelectedCar={setSelectedCar} />
      </>
    )}

    {activePage === "Sell" && <SellCar />}

    {activePage === "Forums" && (
      <Forums forums={forumsData} navigate={navigate} setSelectedForum={setSelectedForum} />
    )}

    {activePage === "Saved" && (
      <Saved cars={carsData} navigate={navigate} setSelectedCar={setSelectedCar} />
    )}

    {activePage === "CarDetail" && <CarDetail car={selectedCar} navigate={navigate} />}
    {activePage === "SellerProfile" && <SellerProfile car={selectedCar} navigate={navigate} />}
    {activePage === "ForumDetail" && <ForumDetail forum={selectedForum} navigate={navigate} />}
    {activePage === "Auth" && <AuthPage navigate={navigate} />}

    <Footer />
  </div>
);
}