// Static profile data — same across languages where appropriate
export const PHOTO_URL = "/truesanjar.png";

export const EMAIL = "truesanjar@gmail.com";

// Social links with their lucide icon names
export const SOCIAL_LINKS = [
  // ===== CONTACT LINKS (for messaging) =====
  {
    id: "anyvoice",
    name: "AnyVoice",
    handle: "@sanjar",
    url: "https://www.anyvoice.world/@sanjar",
    icon: "Megaphone",
    color: "#F59E0B",
    type: "both", // can be messaged AND subscribed
  },
  {
    id: "messenger0",
    name: "Messenger0",
    handle: "truesanjar",
    url: "https://www.messenger0.world/messages/truesanjar%40gmail.com",
    icon: "Chat",
    color: "#1ddbcf",
    type: "contact", // for messaging
  },
  {
    id: "WhatsApp",
    name: "WhatsApp",
    handle: "Sanjar",
    url: "https://wa.me/992078804334",
    icon: "MessageSquare",
    color: "#25D366",
    type: "contact", // for messaging
  },
  {
    id: "Signal",
    name: "Signal",
    handle: "sanjar.26",
    url: "https://signal.me/#eu/pMdvF4xmRcsM8hSjDON1sSo_XICNIv5XfR0bBspgtF2VujTcWURKx7BTTWzo--ku",
    icon: "MessageCircle",
    color: "#08517e",
    type: "contact", // for messaging
  },
  {
    id: "telegram_account",
    name: "Telegram(Account)",
    handle: "truesanjar",
    url: "https://t.me/truesanjar",
    icon: "Send",
    color: "#0088CC",
    type: "contact", // for messaging
  },
  
  // ===== SUBSCRIBE LINKS (for following) =====
  {
    id: "github",
    name: "GitHub",
    handle: "truesanjar",
    url: "https://github.com/truesanjar",
    icon: "Github",
    color: "hsl(var(--github))",
    type: "subscribe", // for following
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "truesanjar",
    url: "https://linkedin.com/in/truesanjar",
    icon: "Linkedin",
    color: "#0A66C2",
    type: "subscribe", // for following
  },
  {
    id: "facebook",
    name: "Facebook(Page)",
    handle: "truesanjar",
    url: "https://www.facebook.com/profile.php?id=61588950107666",
    icon: "Facebook",
    color: "#1877F2",
    type: "subscribe", // for following
  },
  {
    id: "facebook2",
    name: "Facebook(Profile)",
    handle: "Sanjar Asadzoda",
    url: "https://www.facebook.com/truesanjar/",
    icon: "Facebook",
    color: "#1877F2",
    type: "both", // can be messaged AND subscribed
  },
  {
    id: "telegram_channel",
    name: "Telegram(Channel)",
    handle: "thetruesanjar",
    url: "https://t.me/thetruesanjar",
    icon: "Send",
    color: "#0088CC",
    type: "subscribe", // for following
  },
  {
    id: "twitter",
    name: "Twitter/X",
    handle: "truesanjar",
    url: "https://x.com/truesanjar",
    icon: "AtSign",
    color: "hsl(var(--twitter))",
    type: "both", // can be messaged AND subscribed
  },
  {
    id: "youtube",
    name: "Youtube",
    handle: "truesanjar",
    url: "https://youtube.com/@truesanjar",
    icon: "Youtube",
    color: "#FF0000",
    type: "subscribe", // for following
  },
];

// Helper functions to filter social links by type
export const getContactLinks = () => SOCIAL_LINKS.filter(link => 
  link.type === "contact" || link.type === "both"
);

export const getSubscribeLinks = () => SOCIAL_LINKS.filter(link => 
  link.type === "subscribe" || link.type === "both"
);