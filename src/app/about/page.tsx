import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutImage from "@/components/about/AboutImage";
import AboutQuote from "@/components/about/AboutQuote";
import AboutMission from "@/components/about/AboutMission";
import EditorialHeadline from "@/components/home/EditorialHeadline";
import QuizBanner from "@/components/home/QuizBanner";
import AboutSplit from "@/components/about/AboutSplit";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet Prairie Cricket Farms — the Canadian pioneers of sustainable cricket protein. Learn how we're changing the way the world thinks about nutrition.",
  openGraph: {
    title: "Our Story | Prairie Cricket Farms",
    description:
      "Meet Prairie Cricket Farms — the Canadian pioneers of sustainable cricket protein.",
    url: "https://prairiecricketfarms.com/about",
    images: [{ url: "/images/hero/pcf-hero-main.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="main-content">
      <AboutHero
        eyebrow="Our Story"
        heading={
          <>
            Meet Prairie Cricket Farms:
            <br />
            The Cricket Protein Pioneers
          </>
        }
        description="As the original cricket protein specialists, we know just how important sustainable nutrition is. We're tremendously proud of our farm-fresh cricket protein products, and our passionate community of customers is our ultimate proof."
      />
      <AboutImage
        src="/images/about/pcf-about-team.jpg"
        alt="Prairie Cricket Farms founders holding cricket protein powder packages"
      />
      <AboutQuote
        eyebrow="The Family Behind the Farm"
        quote={'\u201cWe created a cricket farm.\nYes, a cricket farm.\u201d'}
      />
      <AboutMission
        heading="OUR PEOPLE"
        cards={[
          {
            image: "/images/about/ryan.jpg",
            alt: "Ryan Steppler",
            title: "Ryan Steppler",
            description: "Co-Founder",
          },
          {
            image: "/images/about/lesley.jpg",
            alt: "Lesley Steppler",
            title: "Lesley Steppler",
            description: "Co-Founder",
          },
          {
            image: "/images/about/john.jpg",
            alt: "John Steadman",
            title: "John Steadman",
            description: "",
          },
        ]}
      />
      <QuizBanner
        heading="THE STORY OF PRAIRIE CRICKET FARMS"
        copy={"Hey! I'm Ryan Steppler and I created a cricket farm.\nYes, a cricket farm."}
        cta={null}
      />
      <EditorialHeadline
        eyebrow="What it takes to start and grow a cricket farm, and why we did it."
        heading="STARTED FROM 200 CRICKETS, NOW WE'RE HERE"
        cta={{ label: "Learn More about the Whole Process", href: "/process" }}
      />
      <AboutSplit
        heading="From Basement To Barn"
        copy={
          <>
            <p>The first question everyone asks is <em>&ldquo;Where did you get such an idea?&rdquo;</em></p>
            <p>When Ryan heard that people around the world eat crickets as a protein source, his ambitious nature led him to start a cricket farm — right in his basement.</p>
            <p>The farm quickly outgrew that space. He built a room in the family farm shop, but production was still limited to a small waitlist of family and friends. So we took a leap and built &ldquo;the barn&rdquo; — a 40&times;40 shed now running at near-full capacity. Those first 200 crickets from January 2016 have turned into millions.</p>
          </>
        }
        image="/images/about/pcf-about-split.jpg"
        imageAlt="Prairie Cricket Farms — From Basement To Barn"
        mobileImageTop
      />
      <AboutSplit
        heading="A Note from Ryan"
        copy={
          <>
            <p>&ldquo;I was raised on family farms and recognize the importance of growing and raising food, so this seemed like a natural fit to diversify our current farming practices.&rdquo;</p>
            <p>&ldquo;I am on an exciting adventure and love telling you why you should eat crickets.&rdquo;</p>
          </>
        }
        image="/images/about/pcf-about-split-2.jpg"
        imageAlt="Ryan Steppler — Co-Founder, Prairie Cricket Farms"
        reverse
      />
      <EditorialHeadline
        eyebrow={""}
        heading={<>Turns Out,<br />We Were On To Something</>}
        description={`The \u201cick factor\u201d disappears once you learn that crickets are truly a superfood AND taste great!`}
        cta={{ label: "DISCOVER MORE", href: "/shop" }}
      />
      <AboutMission
        heading=""
        cards={[
          {
            image: "/images/about/Nutrient-Dense.jpg",
            alt: "Nutrient Dense",
            title: "Nutrient Dense",
            description:
              "Crickets are packed with protein and are great for gut health. They can easily be added to many of the recipes you're already making without altering the taste.",
          },
          {
            image: "/images/about/Eco-Friendly.jpg",
            alt: "Eco-Friendly",
            title: "Eco-Friendly",
            description:
              "Not only are these crickets super healthy for us, but they're great for the environment as well. It's a natural fit to diversify sustainable farming practices.",
          },
          {
            image: "/images/about/Kid-Approved.jpg",
            alt: "Kid Approved",
            title: "Kid Approved",
            description:
              "Our \u201clittlest farmers\u201d love snacking on roasted crickets and use cricket powder in their morning cereal. We feel confident they\u2019re getting the nutrients they need.",
          },
        ]}
      />
    </div>
  );
}
