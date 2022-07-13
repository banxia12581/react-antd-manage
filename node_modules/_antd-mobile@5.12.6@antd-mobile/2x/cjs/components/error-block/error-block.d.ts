import React, { FC, ReactElement, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type ErrorBlockProps = {
    status?: 'default' | 'disconnected' | 'empty' | 'busy';
    title?: ReactNode;
    image?: string | ReactElement;
    description?: ReactNode;
    fullPage?: boolean;
    children?: React.ReactNode;
} & NativeProps<'--image-height' | '--image-height-full-page' | '--image-width' | '--image-width-full-page'>;
export declare const ErrorBlock: FC<ErrorBlockProps>;
