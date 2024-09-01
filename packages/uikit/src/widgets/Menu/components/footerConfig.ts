import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("Ecosystem"),
    items: [
      {
        label: t("Trade"),
        href: "https://islandswap.finance/swap",
      },
      // {
      //   label: t("Earn"),
      //   href: "https://pancakeswap.finance/farms",
      // },
      // {
      //   label: t("Game"),
      //   href: "https://pancakeswap.games/",
      // },
      // {
      //   label: t("NFT"),
      //   href: "https://islandswap.finance/nfts",
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
      // {
      //   label: t("Lottery"),
      //   href: "https://islandswap.finance/lottery",
      // },
    ],
  },
  // {
  //   label: "Business",
  //   items: [
  //     {
  //       label: t("Farms and Syrup Pools"),
  //       href: "https://docs.pancakeswap.finance/ecosystem-and-partnerships/business-partnerships/syrup-pools-and-farms",
  //     },
  //     {
  //       label: t("IFO"),
  //       href: "https://docs.pancakeswap.finance/ecosystem-and-partnerships/business-partnerships/initial-farm-offerings-ifos",
  //     },
  //     {
  //       label: t("NFT Marketplace"),
  //       href: "https://docs.pancakeswap.finance/ecosystem-and-partnerships/business-partnerships/nft-market-applications",
  //     },
  //   ],
  // },
  {
    label: t("Developers"),
    items: [
      // {
      //   label: t("Contributing"),
      //   href: "https://docs.pancakeswap.finance/developers/contributing",
      // },
      {
        label: t("Github"),
        href: "https://github.com/decentralbros/islandswap",
      },
      // {
      //   label: t("Bug Bounty"),
      //   href: "https://docs.pancakeswap.finance/developers/bug-bounty",
      // },
      // {
      //   label: t("v4"),
      //   href: "https://pancakeswap.finance/v4",
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
    label: t("About"),
    items: [
      {
        label: t("Terms Of Service"),
        href: "https://islandswap.finance/terms-of-service",
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
