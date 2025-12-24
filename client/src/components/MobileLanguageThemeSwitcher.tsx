import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function MobileLanguageThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="space-y-3">
      {/* Language Buttons */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">اللغة / Language</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={language === "ar" ? "default" : "outline"}
            onClick={() => setLanguage("ar")}
            className="w-full h-12 text-base"
          >
            العربية
          </Button>
          <Button
            variant={language === "en" ? "default" : "outline"}
            onClick={() => setLanguage("en")}
            className="w-full h-12 text-base"
          >
            English
          </Button>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {language === "ar" ? "المظهر" : "Theme"}
        </p>
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="w-full h-12 text-base flex items-center justify-center gap-2"
        >
          {theme === "light" ? (
            <>
              <Moon className="h-5 w-5" />
              <span>{language === "ar" ? "الوضع الداكن" : "Dark Mode"}</span>
            </>
          ) : (
            <>
              <Sun className="h-5 w-5" />
              <span>{language === "ar" ? "الوضع الفاتح" : "Light Mode"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
