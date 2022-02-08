import { GetStaticProps } from 'next';
import {
  Avatar,
  Card,
  Button,
  Text,
  Spacer,
  Link 
} from '@nextui-org/react';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';
// import GreenGradient from '../static/green-gradient.svg';
// import PurpleGradient from '../static/purple-gradient.svg';
import { getAllPosts, getShowcaseProjects } from '../utils/Content';

const Twitter = () => (<i className='bx bxl-twitter'></i>)
const Github = () => (<i className='bx bxl-github'></i>)
const Gitlab = () => (<i className='bx bxl-gitlab'></i>)

const goto = (url: string) => window.open(url, '_blank');

const BlogPost = (props: any) => {
  const { post } = props;

  return (
    <div className="w-full mx-auto lg:mx-0 z-10 my-5">
      <a href={`/blog/${props.post.slug}`}>
        <Text size={24} color="primary">{post.title}</Text>
      </a>
      <div className='text-sm'> {post.date} </div>
      <div> {post.tags.map((t: any) => `#${t}`).join(', ')} </div>
      {/* <Card hoverable clickable onClick={_ => window.location.href =`/blog/${props.post.slug}`}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Text b color="white" size={16}>{props.post.title}</Text>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            objectFit="cover"
            src={props.post.image}
            height="auto"
            width="100%"
            alt={props.post.title}
          />
        </Card.Body>
        <Card.Footer className='cursor-pointer'>
          <Row justify="center">
            <Text size={16} color="primary" onClick={_ => window.location.href =`/blog/${props.post.slug}`}>Read</Text>
          </Row>
        </Card.Footer>
      </Card> */}
    </div>
  );
}

const Project = (props: any) => {
  return (
    <div className='py-3'>
      <div>
        <a href={props.project.repoUrl} target="_blank" rel="noreferrer">
          <Text size={24} color="primary">{props.project.title}</Text>
        </a>
      </div>
      <div><Text>{props.project.summary}</Text></div>
    </div>
  );
}

const Home = (props: any) => {
  return (
    <Main
      currentPage='/'
      meta={(
        <Meta
          title="Made with Next.js, TypeScript, ESLint, Prettier, PostCSS, Tailwind CSS"
          description="Description"
        />
      )}>
      <div className='container mx-auto'>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='mt-5 self-center'>
            <Card.Header className='flex items-center'>
              <Avatar src="https://avatars.githubusercontent.com/u/2135089" size="xl" color="primary" bordered zoomed />
              <div className='ml-5'>
                <p className='text-xl'>Ganessh Kumar R P</p>
                <div className='flex mt-2 w-full'>
                  <div className='mr-2' onClick={_ => goto('https://twitter.com/ganesshkumar')}>
                    <Avatar size="sm" squared icon={<Twitter/>}/>
                  </div>
                  <div className='mr-2' onClick={_ => goto('https://github.com/ganesshkumar')}>
                    <Avatar size="sm" squared icon={<Github/>}/>
                  </div>
                  <div className='mr-2' onClick={_ => goto('https://gitlab.com/ganesshkumar')}>
                    <Avatar size="sm" squared icon={<Gitlab/>}/>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="text-base">
              <div>Building Microsoft Teams - Full Stack Engineer</div>
            </Card.Body>
          </div>
          
          {/* Latest blog posts */}
          <Spacer y={6} />
          <Text h2 size={30} weight="bold">Latest</Text>
          <Text h1 size={30} weight="bold"
              css={{
                textGradient: '45deg, $blue500 -20%, $pink500 50%'
              }}>
            Blog Posts
          </Text>
          <div className='flex'>
            {/* <div className='absolute -top-80 -left-80'>
              <Image src={PurpleGradient} alt="customization background" />
            </div> */}
            
            <div>
              <div className='flex-col divide-y my-10'>
                {props.posts
                    .slice(0, 5)
                    .map((post: any) => <BlogPost key={post.slug} post={post}/>)}
              </div>
              <div className='mt-5 z-50'>
                <Button bordered color="primary" auto size="xs" className='z-50'>
                  <Link href="/blog">
                    <Text color="primary">Read all posts</Text>
                  </Link>
                </Button>
              </div>
            </div>
            <div className='w-1/2 relative'>
              <img className='absolute top-20 -right-40' src='/assets/images/blog.svg' />
            </div>
          </div>

          <Spacer y={6} />  
          <Text h1 size={30} weight="bold"
              css={{
                textGradient: '45deg, $blue500 -20%, $pink500 50%'
              }}>
            Project
          </Text>
          <Text h2 size={30} weight="bold">Showcase</Text>
          {/* Latest projects */}
          <div className='flex'>
            {/* <div className='absolute -top-80 -right-80'>
              <Image src={GreenGradient} alt="customization background"/>
            </div> */}

            <div className='w-1/2 relative'>
              <img className='absolute top-20 -left-40' src='/assets/images/project.svg' />
            </div>
            <div>
              <div className='flex-col divide-y my-10'>
                {props.projects
                    .map((project: any) => <Project key={project.repoUrl} project={project}/>)}
              </div>
              <div className='mt-5 z-10'>
                <Button bordered color="primary" auto size="xs">
                  <Link href="/projects">
                    <Text color="primary">See all</Text>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <Spacer y={4} />
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