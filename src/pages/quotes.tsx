import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Quotes = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />} currentPage="Quotes">
    <Content>
      <p className="text-3xl">Qutoes I loved</p>
      <ul className="list-disc">
        {quotesContent.map((quote) => (
          <li className="pt-4">
            <span>{quote.text}</span>
            <span className="text-sm mt-2">
              -
              {quote.author}
            </span>
          </li>
        ))}
      </ul>
    </Content>
  </Main>
);

const quotesContent = [
  {
    text: 'Mathematics is the art of explanation',
    author: 'A Mathematician’s Lament by Paul Lockhart',
  },
  {
    text: 'As soon as one freezes a design, it becomes obsolete in terms of its concepts',
    author: 'The Mythical Man-Month by Frederick P. Brooks, Jr.',
  },
];

export default Quotes;
