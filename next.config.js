module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://test-devready.vercel.app", // Your frontend domain
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Allow cookies to be sent
          },
        ],
      },
    ];
  },
};
