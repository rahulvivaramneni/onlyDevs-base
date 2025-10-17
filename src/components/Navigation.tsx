"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

export function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse Gigs" },
    { href: "/post", label: "Post Gig" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            OnlyDevs
          </motion.h1>
        </Link>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.div>
          </Link>
        ))}

        <motion.button
          className="theme-toggle"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
      </div>
    </nav>
  );
}
