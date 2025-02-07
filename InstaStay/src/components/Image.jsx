export default function Image({ src, ...rest }) {
  const srcUrl = src && src.includes("https://")
    ? src
    : `http://localhost:5000/uploads/${src}`;

  return <img {...rest} src={srcUrl} alt={""} />;
}
