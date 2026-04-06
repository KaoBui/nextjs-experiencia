import Hero from "@/components/section/Hero";
import Services from "@/components/section/Services";
import Reasons from "@/components/section/Reasons";
import Testimonials from "@/components/section/Testimonial";
import Calculator from "@/components/section/Calculator";
import Form from "@/components/section/Form";
import { client, urlFor } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";

type SanityImage = {
  alt?: string | null;
  asset?: {
    _id: string;
    url?: string | null;
    metadata?: {
      dimensions?: {
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
  } | null;
};

type HomePageData = {
  title?: string | null;
  subtitle?: string | null;
  availability?: string | null;
  heroImage?: SanityImage | null;
};

function getDefaultAvailability() {
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default async function Home() {
  const homePage = await client.fetch<HomePageData | null>(homePageQuery);
  const heroImageAsset = homePage?.heroImage?.asset;
  const heroImageUrl = homePage?.heroImage
    ? urlFor(homePage.heroImage).width(1000).height(1250).fit("crop").url()
    : null;
  const heroImageWidth = heroImageAsset?.metadata?.dimensions?.width ?? 1000;
  const heroImageHeight = heroImageAsset?.metadata?.dimensions?.height ?? 1250;
  const heroImageAlt = homePage?.heroImage?.alt || homePage?.title || "";
  const availabilityText =
    homePage?.availability?.trim() || getDefaultAvailability();

  return (
    <>
      <Hero
        title={homePage?.title}
        subtitle={homePage?.subtitle}
        availability={availabilityText}
        heroImageUrl={heroImageUrl}
        heroImageAlt={heroImageAlt}
        heroImageWidth={heroImageWidth}
        heroImageHeight={heroImageHeight}
      />
      <Services />
      <Calculator />
      <Reasons />
      <Testimonials />
      <Form />
    </>
  );
}
