import { showNotification } from "@mantine/notifications";
import Cookies from "universal-cookie";
import { greenNotify } from "../notification";

export const removeUnderScore = (str) => {
  var i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
};

export const getYoutubeThumbnail = (url, quality) => {
  if (url) {
    var video_id, thumbnail, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    }

    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }

      var quality_key = "maxresdefault"; // Max quality
      if (quality === "low") {
        quality_key = "sddefault";
      } else if (quality === "medium") {
        quality_key = "mqdefault";
      } else if (quality === "high") {
        quality_key = "hqdefault";
      }

      thumbnail =
        "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
      return thumbnail;
    }
  }
  return false;
};

export const removeCookie = (navigate) => {
  localStorage.removeItem("filter");
  localStorage.removeItem("page");
  const cookies = new Cookies();
  cookies.set("token", "", { path: "/", expires: new Date(Date.now()) });
  showNotification({
    title: "Log Out Successful",
    styles: greenNotify,
  });
  navigate("/prelogin");
};
