export default function ContactUs() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="card bg-base-100 max-w-4xl mx-auto shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Office</h2>
              <address className="not-italic">
                <p className="font-medium">DevReady Academy</p>
                <p>C-94A,Block C, MayurVihar</p>
                <p>Indiranagar, Lucknow</p>
                <p>Uttar Pradesh - 226015</p>
                <p>India</p>
              </address>

              <div className="mt-4">
                <p className="font-medium">Email:</p>
                <p>devreadyacademy@gmail.com</p>

                <p className="font-medium mt-2">Phone:</p>
                <p>+918468095857</p>

                <p className="font-medium mt-2">Business Hours:</p>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full h-32"></textarea>
                </div>

                <button className="btn btn-primary w-full">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
