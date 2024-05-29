import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Bootstrap from "../components/Bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Bootstrap />
    </>
  );
}

export default MyApp;
