import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type InfiniteScrollProps = {
    loadMore: () => Promise<void>;
    hasMore: boolean;
    threshold?: number;
    children?: React.ReactNode;
} & NativeProps;
export declare const InfiniteScroll: FC<InfiniteScrollProps>;
