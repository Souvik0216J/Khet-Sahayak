"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}${pathname}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("hi")}>हिन्दी</button>
      <button onClick={() => changeLanguage("bn")}>বাংলা</button>
    </div>
  );
}
