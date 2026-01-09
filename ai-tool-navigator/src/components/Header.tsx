import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            AI<span className="text-accent">Discover</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              !isAdmin ? "text-accent" : "text-muted-foreground"
            )}
          >
            Explore Tools
          </Link>
          <Link
            to="/admin"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isAdmin ? "text-accent" : "text-muted-foreground"
            )}
          >
            Admin Dashboard
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Sparkles className="w-4 h-4 mr-2" />
                View Catalog
              </Link>
            </Button>
          ) : (
            <Button variant="accent" size="sm" asChild>
              <Link to="/admin">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Admin Panel
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container flex flex-col gap-2 py-4">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                !isAdmin ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-muted"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Tools
            </Link>
            <Link
              to="/admin"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                isAdmin ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-muted"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
