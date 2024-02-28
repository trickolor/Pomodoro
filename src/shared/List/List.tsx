import React from 'react';
import { addKey } from '../../utils/addKey';

export interface IItemProps {
  As: 'li' | 'div' | 'span' | 'button' | 'a';
  className?: string;
  children?: React.ReactNode;
  text?: string;
  href?: string;
  onClick?: () => void;
}

export interface IListProps {
  As: 'ul' | 'ol' | 'div';
  className: string;
  items: IItemProps[];
}

export function List({ As, className, items }: IListProps) {
  const mappedItems = items.map<React.ReactNode>((item) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <item.As className={item.className} href={item.href} onClick={item.onClick}>
        {item.children}
        {item.text}
      </item.As>
    )
  }).map(addKey);

  return (
    <As className={className}>
      {mappedItems}
    </As >
  );
}
