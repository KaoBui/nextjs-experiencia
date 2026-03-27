import Hero from "@/components/section/Hero";
import Services from "@/components/section/Services";
import Reasons from "@/components/section/Reasons";
import Testimonials from "@/components/section/Testimonial";
import Calculator from "@/components/section/Calculator";
import Form from "@/components/section/Form";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Calculator />
      <Reasons />
      <Testimonials />
      <Form />
    </>
  );
}
