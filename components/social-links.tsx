import React from 'react';

const Twitter = () => (<i className='cursor-pointer bx bxl-twitter'></i>)
const Github = () => (<i className='cursor-pointer bx bxl-github'></i>)
const Gitlab = () => (<i className='cursor-pointer bx bxl-gitlab'></i>)
const LinkedIn = () => (<i className='cursor-pointer bx bxl-linkedin'></i>)

const goto = (url: string) => window.open(url, '_blank');

const SocialLinks = () => {
  return (
    <div className='flex mt-2 w-full space-x-4'>
      <div className="avatar" onClick={_ => goto('https://twitter.com/ganesshkumar')}>
        <div className="text-3xl">
          <Twitter/>
        </div>
      </div>
      <div className="avatar" onClick={_ => goto('https://github.com/ganesshkumar')}>
        <div className="text-3xl">
          <Github/>
        </div>
      </div>
      <div className="avatar" onClick={_ => goto('https://gitlab.com/ganesshkumar')}>
        <div className="text-3xl">
          <Gitlab/>
        </div>
      </div>
      <div className="avatar" onClick={_ => goto('https://www.linkedin.com/in/ganessh-kumar-r-p-676a4719/')}>
        <div className="text-3xl">
          <LinkedIn />
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;