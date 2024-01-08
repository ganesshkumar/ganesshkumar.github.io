import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';
import { getAllPosts, getShowcaseProjects } from '../utils/Content';
import SocialLinks from '../components/social-links';

const BlogPost = (props: any) => {
  const { post } = props;

  return (
    <div className="w-full mx-auto lg:mx-0 z-10 py-3">
      <a className='no-underline' href={`/articles/${props.post.slug}`}>
        <div className='text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline'>{post.title}</div>
      </a>
      {/* <div className='text-sm'> {post.date} </div> */}
      <div className='text-slate-400 font-semibold uppercase text-xs pt-1'>
        {post.tags.join(', ')}
      </div>
    </div>
  );
}

const LatestBlogPosts = ({posts}: {posts: any[]}) => {
  return (
    <div className='px-4 basis-full md:basis-1/2'>
      <h1 className='font-bold text-3xl'>
        <span className='tracking-wide underline decoration-sky-500 decoration-4 underline-offset-2'>Latest Articles</span>
      </h1>
      <div className='flex-col divide-y my-5'>
        {posts
            .slice(0, 5)
            .map((post: any) => <BlogPost key={post.slug} post={post}/>)}
      </div>
      <div className='mt-5'>
        <button className='bg-sky-600 hover:bg-sky-800 py-1 px-2 rounded'>
          <Link href="/articles">
            <a className= "px-1 text-sky-100 hover:text-sky-100 no-underline">Read all posts</a>
          </Link>
        </button>
      </div>
    </div>
  );
}

const Project = (props: any) => {
  return (
    <div className='py-3'>
      <div>
        <a className='no-underline' href={props.project.repoUrl} target="_blank" rel="noreferrer">
          <div className='text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline'>{props.project.title}</div>
        </a>
      </div>
      <div className='text-slate-600 text pt-1'>
        {props.project.summary}
      </div>
    </div>
  );
}

const ProjectShowcase = ({ projects }: { projects: any[]}) => {
  return (
    <div className='px-4 basis-full md:basis-1/2'>
      <h1 className='font-bold text-3xl tracking-wide underline decoration-sky-500 decoration-4 underline-offset-2'>
        Project Showcase
      </h1>
      <div className='flex-col divide-y my-5'>
        {projects
            .map((project: any) => <Project key={project.repoUrl} project={project}/>)}
      </div>
      <div className='mt-5'>
        <button className='bg-sky-600 hover:bg-sky-800 py-1 px-2 rounded'>
          <Link href="/projects">
            <a className="px-1 text-sky-100 hover:text-sky-100 no-underline">See all</a>
          </Link>
        </button>
      </div>
    </div>
  );
}

const Home = (props: any) => {
  return (
    <Main
      currentPage='Home'
      meta={(
        <Meta
          title="Home"
          description="Description"
        />
      )}>
      <div className='bg-white'>
        <div className='flex flex-col h-full'>
          {/* Banner */}
          <header className='flex flex-col justify-center items-center' style={{minHeight: '60vh'}}>
            {/* <div className='flex justify-center items-center'>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://avatars.githubusercontent.com/u/2135089" alt='profile picture' />
                </div>
              </div>
              <div className='ml-5'>
                <p className='text-xl'>Ganessh Kumar R P</p>
                <SocialLinks />
              </div>
            </div>
            <div className="pt-2 text-base text-center">
              <div>I am a Full-Stack Software Engineer, currently building Microsoft Teams at Microsoft. I build and maintain Obsidian Plugins.</div>
            </div> */}
            <div className='flex w-full relative border border-0 border-b-2 border-sky-600 bg-transparent'>
              <div className='flex basis-1/2 justify-center'>
                <div className='flex flex-col justify-center'>
                  <h5 className='text-sky-600'>
                    Hi 👋 I am
                  </h5>
                  <div className='text-4xl text-black font-bold mt-2'>
                    Ganessh Kumar R P
                  </div>
                  <div className='text-xl my-5'>
                    Full-Stack Software Engineer
                  </div>
                  <p className='text-base text-slate-600'>
                    Currently building Microsoft Teams at Microsoft.
                    <br/>
                    I build and maintain Obsidian Plugins.
                  </p>
                </div>
              </div>
              <div className='flex basis-1/2 justify-center overflow-hidden'>
                <img className='object-cover h-96 w-96' src="/ganesshkumar-emoji.png" alt='profile picture' />
              </div>
              <div className='absolute bg-sky-300 w-8 h-8 rounded-full -left-12 p-12 blur-xl'></div>
              <div className='absolute bg-orange-400 w-8 h-8 rounded-full right-8 bottom-20 p-16 blur-xl'></div>
              <div className='absolute bg-orange-500 w-8 h-8 rounded-full left-1/3 top-10 p-10 blur-xl'></div>
              <div className='absolute bg-sky-400 w-8 h-8 rounded-full left-2/3 p-8 blur-xl'></div>
              <div className='absolute bg-sky-400 w-8 h-8 rounded-full bottom-10 left-1/2 p-8 blur-xl'></div>
            </div>
          </header>
          
          <main className='my-10 container mx-auto w-100 lg:w-2/3 2xl:w-1/2 '>
            <div className='flex flex-wrap'>
              {/* Latest blog posts */}
              <LatestBlogPosts posts={props.posts} />
              {/* Latest projects */}
              <ProjectShowcase projects={props.projects} />
            </div>
          </main>
        </div>
      </div>
      {/* #9C9C9C */}
    </Main>
  );
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const posts = getAllPosts(['title', 'date', 'slug', 'image', 'tags']);
  const projects = getShowcaseProjects(['title', 'summary', 'repoUrl', 'iconUrl']);

  return {
    props: {
      posts, projects
    },
  };
};

export default Home;