import React from "react";

const Payment = () => {
  const videoURL =
    "https://www.youtube.com/watch?v=72iEz5iopqQ&ab_channel=ChaooCharles";

  const videoId = new URL(videoURL).searchParams.get("v");
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <h1>Stripe Payment</h1>
      <iframe
        width="600"
        height="355"
        src={embedUrl}
        title="YouTube Video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Payment;
