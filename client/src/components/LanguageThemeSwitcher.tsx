import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Switch language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("ar")}>
            <span className={language === "ar" ? "font-semibold" : ""}>العربية</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("en")}>
            <span className={language === "en" ? "font-semibold" : ""}>English</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Switcher */}
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
        {theme === "light" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
