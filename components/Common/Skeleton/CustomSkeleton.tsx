import styled, { css, CSSProperties } from 'styled-components';

type TSkeleton = {
  width: number;
  height?: number;
  radius?: string;
  border?: string;
  myStyle?: CSSProperties;
};

export default function CustomSkeletonUI(props: TSkeleton) {
  return (
    <Skeleton
      width={props.width}
      height={props.height}
      radius={props.radius}
      border={props.border}
      style={props.myStyle}
    ></Skeleton>
  );
}

const Skeleton = styled.div<TSkeleton>`
  width: ${props => props.width + 'px'};
  background-color: #eee;
  ${props =>
    props.height &&
    css`
      height: ${props.height + 'px'};
    `}
  ${props =>
    props.radius &&
    css`
      border-radius: ${props.radius};
    `}
    animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;

const SkeletonWrapper = styled.div`
  margin: auto;
  width: 500px;
  height: 400px;
  background-color: #eee;
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 40%,
      rgba(255, 255, 255, 0) 70%
    ),
    linear-gradient(#eee 200px, transparent 20px);
  background-repeat: repeat-y;
  background-size: 100px 100px;
  animation: shine 1s infinite;
  @keyframes shine {
    to {
      background-position: 100%;
    }
  }
`;
