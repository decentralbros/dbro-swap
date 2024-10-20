import { useTranslation } from "@pancakeswap/localization";
import { JSXElementConstructor, ReactNode, createElement } from "react";
import { styled } from "styled-components";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Image } from "../Image";
import { Text } from "../Text";

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`;

const NotFound = ({
  statusCode = 404,
  children,
  LinkComp,
}: {
  LinkComp: JSXElementConstructor<any>;
  statusCode?: number;
  children: ReactNode;
}) => {
  const { t } = useTranslation();

  const linkElement = createElement(
    LinkComp,
    {
      href: "/",
      passHref: true,
    },
    <Button scale="sm" style={{ color: "#000" }}>
      {t("Back Home")}
    </Button>
  );

  return (
    <>
      {children}
      <StyledNotFound>
        <Image src="/logo.webp" alt="decentral bros" width={100} height={100} />
        <Heading scale="xxl">{statusCode}</Heading>
        <Text mb="16px">{t("Oops, page not found.")}</Text>
        {linkElement}
      </StyledNotFound>
    </>
  );
};

export default NotFound;
