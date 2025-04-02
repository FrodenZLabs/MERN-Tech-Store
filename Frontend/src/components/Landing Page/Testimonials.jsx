import Testimonial1 from "../../assets/images/Landing Page/testimonial-1.jpg";
import Testimonial2 from "../../assets/images/Landing Page/testimonial-2.jpg";
import Testimonial3 from "../../assets/images/Landing Page/testimonial-3.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      rating: 5,
      review: "Great service! Easy to use and very helpful.",
      avatar: Testimonial1,
    },
    {
      name: "Jane Smith",
      rating: 4,
      review: "I was able to get my laptop quickly and affordably.",
      avatar: Testimonial2,
    },
    {
      name: "Alex Johnson",
      rating: 5,
      review: "The AI assessment was quick and accurate.",
      avatar: Testimonial3,
    },
  ];

  return (
    <section
      id="testimonials"
      className="flex items-center h-[60vh] bg-gray-100"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-amber-500">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;{testimonial.review}&quot;
              </p>
              <div className="flex items-center justify-center">
                {/* Avatar (Replaced Flowbite Avatar) */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="ml-3 text-left">
                  <span className="font-semibold block">
                    {testimonial.name}
                  </span>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
