export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="card bg-base-100 max-w-4xl mx-auto shadow-xl">
        <div className="card-body prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">
            Refund and Cancellation Policy
          </h1>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">1. Refund Eligibility</h2>
            <ul>
              <li>Refund requests must be made within 48 hours of purchase</li>
              <li>Unused subscription credits are eligible for refund</li>
              <li>
                Technical issues preventing service usage qualify for refund
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">2. Refund Process</h2>
            <ul>
              <li>Submit refund request through our support portal</li>
              <li>Include order ID and reason for refund</li>
              <li>Refunds are processed within 3-5 working days</li>
              <li>Amount will be credited to the original payment method</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">3. Non-refundable Items</h2>
            <ul>
              <li>Used interview credits</li>
              <li>Completed mock interviews</li>
              <li>Customized interview packages</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
