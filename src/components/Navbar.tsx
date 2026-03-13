import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Diamond, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const {
    user,
    wallet,
    connectWallet,
    disconnectWallet,
    logout,
    showAuthModal,
    setShowAuthModal,
  } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const navLinks = [
    { to: "/", label: "Explore" },
    ...(user ? [{ to: "/dashboard", label: "My Products" }] : []),
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Diamond className="h-5 w-5 text-primary" />
            <span className="font-serif text-xl tracking-wide text-primary">
              PROVANCE
            </span>
          </Link>

          {/* Center nav - desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === l.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions - desktop */}
          <div className="hidden items-center gap-3 md:flex">
            {wallet ? (
              <Button
                variant="gold-outline"
                size="sm"
                onClick={disconnectWallet}
              >
                {truncate(wallet)}
              </Button>
            ) : (
              <Button
                variant="gold-outline"
                size="sm"
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            )}
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button
                variant="gold"
                size="sm"
                onClick={() => setShowAuthModal(true)}
              >
                Login / Sign Up
              </Button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
                {wallet ? (
                  <Button
                    variant="gold-outline"
                    size="sm"
                    onClick={disconnectWallet}
                  >
                    {truncate(wallet)}
                  </Button>
                ) : (
                  <Button
                    variant="gold-outline"
                    size="sm"
                    onClick={() => connectWallet()}
                  >
                    Connect Wallet
                  </Button>
                )}
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-muted-foreground"
                  >
                    <LogOut className="mr-1 h-4 w-4" /> Logout
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Login / Sign Up
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};
