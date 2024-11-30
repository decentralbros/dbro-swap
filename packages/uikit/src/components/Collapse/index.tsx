import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { Box, BoxProps } from "../Box";
import { ChevronDownIcon } from "../Svg";

const TitleWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const ContentWrapper = styled(Box)`
  overflow: hidden;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(0deg);
  transition: transform 0.25s ease;
  cursor: pointer;
  &.open {
    transform: rotate(180deg);
  }
`;

const Container = styled(Box)<BoxProps>`
  overflow: hidden;
  display: flex;
  width: 100%;
  flex-direction: column;
  will-change: height;
  transition: height 0.25s ease-in-out;
`;

interface CollapseProps extends Omit<BoxProps, "title" | "content"> {
  title?: React.ReactNode;
  content?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  recalculateDep?: boolean;
  titleBoxProps?: BoxProps;
  contentBoxProps?: BoxProps;
  contentExtendableMaxHeight?: number;
}

export const Collapse: React.FC<CollapseProps> = ({
  title,
  content,
  isOpen,
  onToggle,
  recalculateDep = false,
  titleBoxProps,
  contentBoxProps,
  contentExtendableMaxHeight,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle?.();
  };

  useEffect(() => {
    if (!contentRef.current || !titleRef.current || !wrapperRef.current) return;
    const contentHeight = contentRef.current.scrollHeight;
    const titleHeight = titleRef.current.scrollHeight;
    const finalContentHeight = contentExtendableMaxHeight ?? contentHeight;

    wrapperRef.current.style.height = `${isOpen ? titleHeight + finalContentHeight : titleHeight}px`;
  }, [isOpen, recalculateDep, contentExtendableMaxHeight]);

  return (
    <Container ref={wrapperRef} {...props}>
      <TitleWrapper ref={titleRef} onClick={handleToggle} {...titleBoxProps}>
        {title}
        <IconWrapper className={isOpen ? "open" : undefined}>
          <ChevronDownIcon color="textSubtle" width="24px" />
        </IconWrapper>
      </TitleWrapper>
      <ContentWrapper ref={contentRef} {...contentBoxProps}>
        {content}
      </ContentWrapper>
    </Container>
  );
};
