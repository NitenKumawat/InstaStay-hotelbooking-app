import { API_URL } from "../Config";

export default function Image({ src, ...rest }) {
  const srcUrl = src && src.includes("https://")
    ? src
    : `${API_URL}/uploads/${src}`;

  return <img {...rest} src={srcUrl} alt={""} />;
}
