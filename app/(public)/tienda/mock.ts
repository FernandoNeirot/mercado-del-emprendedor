import { StoreVendor } from "@/features/tienda";

export const mockStore:StoreVendor = {
    id: "1",
    slug: "feni-indumentaria-infantil",
    category: "ropa",
    isActive: true,
    createdAt: new Date(),
    name: "Feni Indumentaria Infantil",
    logoUrl: "https://feniindumentariainfantil.com/logo.png",
    bannerUrl: "https://rokita-kids.com/banner.png",
    tagline: "Feni Indumentaria Infantil",
    verified: true,
    stats: {
        sales: "100",
        yearsInBusiness: "10",
        location: "Buenos Aires",
    },
    deliveryDays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    availability: [
        { day: "Lunes", availability: "10:00 - 18:00" },
        { day: "Martes", availability: "10:00 - 18:00" },
        { day: "Miércoles", availability: "10:00 - 18:00" },
        { day: "Jueves", availability: "10:00 - 18:00" },
        { day: "Viernes", availability: "10:00 - 18:00" },
        { day: "Sábado", availability: "10:00 - 12:00" },
        { day: "Domingo", availability: "Cerrado" },
    ],
    socialLinks: {
        instagram: "https://www.instagram.com/rokita-kids",
        facebook: "https://www.facebook.com/rokita-kids",
        tiktok: "https://www.tiktok.com/@rokita-kids",
    },
    personalInfo: {
        website: "https://www.rokita-kids.com",
        email: "info@rokita-kids.com",
        phone: "1234567890",
        address: "123 Main St, Anytown, USA",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
    },
    paymentMethods: ["transferencia", "efectivo", "mercadopago"],
    story: {
        founderName: "John Doe",
        paragraphs: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
    },
}