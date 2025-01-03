import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      <title>{title || "Default Title"}</title>
      <meta name="description" content={description || "Default description for the webpage."} />
      <meta name="keywords" content={keywords || "default, keywords"} />
      <meta property="og:title" content={title || "Default Title"} />
      <meta property="og:description" content={description || "Default description for the webpage."} />
      <meta property="og:image" content={image || "https://www.example.com/default-image.jpg"} />
      <meta property="og:url" content={url || "https://www.example.com"} />
      <meta name="twitter:title" content={title || "Default Title"} />
      <meta name="twitter:description" content={description || "Default description for the webpage."} />
      <meta name="twitter:image" content={image || "https://www.example.com/default-image.jpg"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default Seo;