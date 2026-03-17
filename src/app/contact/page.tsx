import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Prairie Cricket Farms",
  description:
    "Interested in becoming a Prairie Cricket Farms retailer?",
};

export default function ContactPage() {
  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--color-bg, #fffdf5)",
        }}
        className="main-content"
      >
        <ContactHero
          eyebrow="The Sustainable Future of Protein"
          heading={<>Looking for more<br />information?</>}
          description="Interested in becoming a Prairie Cricket Farms retailer?"
        />
        <ContactForm />
      </div>
    </>
  );
}
