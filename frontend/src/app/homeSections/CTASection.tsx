import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="p-2">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 p-4 py-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl">
        <SectionTitle
          title="Join AILogue"
          descriptionLeft="Start Crafting AI Dialogues"
          titleClassName="mx-auto"
        />
        <div className="flex-1 flex flex-col gap-4">
          <p className="">
            Join AILogue for free and experience the future of AI conversation
            creation. Begin exploring, creating, and sharing your unique
            dialogues now.
          </p>
          <Button className="mx-auto sm:ml-auto">
			<Link href="/signup">
            Create Your Free Account
			</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
