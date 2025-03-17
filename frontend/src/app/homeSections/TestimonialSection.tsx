"use client";
import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/lib/data/testimonials";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "@/components/SectionTitle";

const TestimonialSection = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    draggable: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="space-y-8 pb-8">
      <SectionTitle title="Testimonials" titleClassName="mx-auto" />
      <div className="sm:max-w-2xl mx-auto py-4">
        <Slider {...settings} className="">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;
