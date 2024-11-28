import React from "react";

async function MockID({ params }) {
  const paramsId = await params;

  return <div className="mt-40">MockID:{paramsId?.id}</div>;
}

export default MockID;
