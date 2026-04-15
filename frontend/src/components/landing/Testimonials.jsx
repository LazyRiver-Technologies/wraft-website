import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "We set up Wraft for our dental clinic in Bangalore. Patients now book appointments in Kannada on WhatsApp — it's like magic. Our phone calls dropped by 60%.",
    name: "Dr. Priya Sharma",
    role: "Dental Clinic Owner, Bangalore",
    image: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxsb2NhbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBzbWlsaW5nJTIwY2xpbmljfGVufDB8fHx8MTc3NjE5Mzc1NHww&ixlib=rb-4.1.0&q=85&w=200",
    rating: 5,
  },
  {
    quote: "My restaurant gets orders from Hindi and Telugu speaking customers all day. Wraft handles everything — menu queries, timings, even special requests. Best investment we made.",
    name: "Rajesh Kumar",
    role: "Restaurant Owner, Hyderabad",
    image: "https://images.unsplash.com/photo-1607756196724-7bcf730ca638?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBsb2NhbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBzbWlsaW5nfGVufDB8fHx8MTc3NjE5Mzc1NHww&ixlib=rb-4.1.0&q=85&w=200",
    rating: 5,
  },
  {
    quote: "The setup was completely free and took just 15 minutes. Our tuition center now handles parent queries 24/7 in Marathi and English. Incredible value at ₹999/month.",
    name: "Anita Deshmukh",
    role: "Education Center, Pune",
    image: "https://images.unsplash.com/photo-1685884626300-45d8dd0d2aaf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBsb2NhbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBzbWlsaW5nfGVufDB8fHx8MTc3NjE5Mzc1NHww&ixlib=rb-4.1.0&q=85&w=200",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">Testimonials</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Loved by local businesses
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            From clinics to restaurants to coaching centers — businesses across India trust Wraft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <p className="text-sm text-[#52525B] leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-bold text-[#0A0A0A]">{t.name}</p>
                  <p className="text-xs text-[#52525B]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
