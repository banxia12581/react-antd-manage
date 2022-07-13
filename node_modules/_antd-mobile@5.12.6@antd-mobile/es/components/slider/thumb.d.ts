import React, { FC, RefObject } from 'react';
declare type ThumbProps = {
    value: number;
    min: number;
    max: number;
    disabled: boolean;
    onDrag: (value: number, first: boolean, last: boolean) => void;
    trackRef: RefObject<HTMLDivElement>;
    icon?: React.ReactNode;
};
declare const Thumb: FC<ThumbProps>;
export default Thumb;
