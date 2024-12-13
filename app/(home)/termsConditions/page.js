export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="card bg-base-100 max-w-4xl mx-auto shadow-xl">
        <div className="card-body prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DevReady Academy's services, you agree to
              be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">2. Services Description</h2>
            <p>DevReady Academy provides:</p>
            <ul>
              <li>Mock technical interviews with Experts</li>
              <li>Interview preparation resources</li>
              <li>Skill assessment services</li>
              <li>Career guidance and coaching</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
            <ul>
              <li>Maintain accurate account information</li>
              <li>Ensure proper internet connectivity during sessions</li>
              <li>Not share account credentials</li>
              <li>
                Use the service for legitimate interview preparation purposes
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
            <p>
              All content, including questions, assessments, and materials, is
              the property of DevReady Academy and protected by copyright laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">5. Payment Terms</h2>
            <ul>
              <li>All prices are in Indian Rupees (INR)</li>
              <li>
                Payments are processed securely through authorized payment
                gateways
              </li>
              <li>Subscription fees are non-transferable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall
              be subject to the exclusive jurisdiction of courts in Lucknow,
              UttarPradesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
