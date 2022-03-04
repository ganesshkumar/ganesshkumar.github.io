import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';

const Notes = () => (
  <Main meta={<Meta title="Notes and Primer" description="Notes and Primer" />} currentPage="Notes">
    <Content className=''>
      <p className="text-3xl">Notes</p>
      <ul className="list-decimal list-inside">
        <li>
          <a
            className="underline"
            href="/assets/files/differentiation-formulas-explained.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Remembering Differential Equation Formulas (pdf file)
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://ganesshkumar.gitbooks.io/kubernetes"
            target="_blank"
            rel="noreferrer"
          >
            Introduction to Kubernetes: Notes from LFS158x (gitbooks.io)
          </a>
        </li>
      </ul>
    </Content>
  </Main>
);

export default Notes;
