import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px;
    overflow: hidden;
`;

export const AnimatedToastWrapper = styled(animated.div)`
  & + & {
    margin-top: 8px;
  }
`;
