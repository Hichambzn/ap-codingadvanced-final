import { useEffect } from "react";

const Bootstrap = () => {
  useEffect(() => {
    // Dynamisch importeren van jQuery en Bootstrap JavaScript
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    import("jquery/dist/jquery.min.js");
  }, []);

  return null;
};

export default Bootstrap;
