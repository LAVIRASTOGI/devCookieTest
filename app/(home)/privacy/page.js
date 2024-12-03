export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="card bg-base-100 max-w-4xl mx-auto shadow-xl">
        <div className="card-body prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul>
              <li>Personal information (name, email, contact number)</li>
              <li>Professional information (skills, experience level)</li>
              <li>Interview responses and assessment data</li>
              <li>Payment information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">
              2. How We Use Your Information
            </h2>
            <ul>
              <li>Provide personalized interview experiences</li>
              <li>Improve our services and question bank</li>
              <li>Process payments and send notifications</li>
              <li>Communicate updates and offers</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              data. Your information is encrypted and stored securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Data Retention</h2>
            <p>
              We retain your data for as long as necessary to provide our
              services and comply with legal obligations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
