import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("Ecosystem"),
    items: [
      {
        label: t("Trade"),
        href: "https://decentralbros.finance/swap",
      },
      {
        label: t("Lottery"),
        href: "https://decentralbros.finance/lottery",
      },
      {
        label: t("Staking"),
        href: "https://decentralbros.finance/staking",
      },
      // {
      //   label: t("Game"),
      //   href: "https://pancakeswap.games/",
      // },
      // {
      //   label: t("NFT"),
      //   href: "https://decentralbros.finance/nfts",
      // },
      // {
      //   label: t("Tokenomics"),
      //   href: "https://docs.pancakeswap.finance/governance-and-tokenomics/cake-tokenomics",
      // },
      // {
      //   label: t("CAKE Emission Projection"),
      //   href: "https://analytics.pancakeswap.finance/",
      // },
      // {
      //   label: t("Merchandise"),
      //   href: "https://merch.pancakeswap.finance/",
      // },
    ],
  },
  {
    label: "Community",
    items: [
      {
        label: t("X.com"),
        href: "https://x.com/DecentralBros_",
      },
      {
        label: t("Telegram"),
        href: "https://t.me/DecentralBros",
      },
      {
        label: t("Discord"),
        href: "https://discord.gg/qyYdrd4uGg",
      },
    ],
  },
  {
    label: t("Developers"),
    items: [
      // {
      //   label: t("Contributing"),
      //   href: "https://docs.pancakeswap.finance/developers/contributing",
      // },
      {
        label: t("GitHub"),
        href: "https://github.com/decentralbros",
      },
      // {
      //   label: t("Bug Bounty"),
      //   href: "https://docs.pancakeswap.finance/developers/bug-bounty",
      // },
      // {
      //   label: t("v4"),
      //   href: "https://decentralbros.finance/v4",
      // },
    ],
  },
  {
    label: t("Support"),
    items: [
      {
        label: t("Contact"),
        href: "mailto:team@decentralbros.xyz",
      },
      // {
      //   label: t("Troubleshooting"),
      //   href: "https://docs.pancakeswap.finance/readme/help/troubleshooting",
      // },
      // {
      //   label: t("Documentation"),
      //   href: "https://docs.pancakeswap.finance/",
      // },
    ],
  },
  {
    label: t("Legal"),
    items: [
      {
        label: t("Terms Of Service"),
        href: "https://decentralbros.finance/terms-of-service",
      },
      {
        label: t("Privacy Policy"),
        href: "https://decentralbros.finance/privacy-policy",
      },
      // {
      //   label: t("Blog"),
      //   href: "https://blog.pancakeswap.finance/",
      // },
      // {
      //   label: t("Brand Assets"),
      //   href: "https://docs.pancakeswap.finance/ecosystem-and-partnerships/brand",
      // },
      // {
      //   label: t("Careers"),
      //   href: "https://docs.pancakeswap.finance/team/become-a-chef",
      // },
    ],
  },
];
