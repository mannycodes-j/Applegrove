import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const quickLinks = [
    { name: "Services", href: "services" },
    { name: "Our Work", href: "work" },
    { name: "About Us", href: "about" },
    { name: "Contact Us", href: "contact" },
  ]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-12 border-t-[18px] border-white px-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="Applegrove Advisory Limited"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 md:mr-32 mr-0">
              Quick links
            </h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6">
          <p className="text-sm text-gray-400">
            © {currentYear} AppleGrove. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
