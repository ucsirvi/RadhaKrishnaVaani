import { useEffect } from "react";
import krishna from "../assets/krishna.jpg";

const GitaBot = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = () => resolve();

        script.onerror = () =>
          reject(new Error(`Failed to load script: ${src}`));

        document.body.appendChild(script);
      });
    };

    const loadBotpressScripts = async () => {
      try {
        await loadScript("https://cdn.botpress.cloud/webchat/v2.2/inject.js");
        await loadScript(
          "https://files.bpcontent.cloud/2024/10/04/14/20241004142119-0UR9DVOH.js "
        );

        window.botpressWebChat.init({
          botId: "your-bot-id",
          botName: "KrishnaBot",
          botAvatarUrl: { krishna },
        });

        console.log("Botpress scripts loaded successfully");
      } catch (error) {
        console.error(error);
      }
    };

    loadBotpressScripts();

    return () => {
      const scripts = [
        "https://cdn.botpress.cloud/webchat/v2.2/inject.js",
        "https://files.bpcontent.cloud/2024/10/04/14/20241004142119-0UR9DVOH.js",
      ];

      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return <div></div>;
};

export default GitaBot;
