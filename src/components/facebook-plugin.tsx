// components/FacebookPagePlugin.tsx
import { useEffect } from "react";

export default function FacebookPagePlugin() {
  useEffect(() => {
    if (document.getElementById("facebook-jssdk")) return;

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="fb-page overflow-hidden w-full h-[300px]"
      data-href="https://www.facebook.com/profile.php?id=100069774854227"
      data-tabs="timeline"
      data-width=""
      data-height=""
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    ></div>
  );
}
