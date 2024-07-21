declare module 'react-rating-stars-component' {
  import { Component } from 'react';

  interface ReactStarsProps {
    count?: number;
    value?: number;
    size?: number;
    color?: string;
    activeColor?: string;
    a11y?: boolean;
    char?: string;
    emptyIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    onChange?: (newRating: number) => void;
    edit?: boolean;
    isHalf?: boolean;
  }

  class ReactStars extends Component<ReactStarsProps> {}

  export default ReactStars;
}