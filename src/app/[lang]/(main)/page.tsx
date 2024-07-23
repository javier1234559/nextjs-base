import { getDictionary } from "@/dictionaries/get-dictionary";
import { DefaultPageProps } from "@/types/common";
import FooterLanguageSelect from "./_components/language-select";

export default async function Home({ params }: DefaultPageProps) {

  const t = await getDictionary(params.lang)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl text-blue-light leading-4">{t.Hello}</h1>
    <div>
    <FooterLanguageSelect />
    </div>
    </main>
  );
}
