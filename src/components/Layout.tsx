import { FC, ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  title: string,
  children: ReactNode
};


export const Layout: FC<Props> = ({ children, title = 'T3 Stach' }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name='description' content='Generated by create-ts-app' />
        <link rel='icon' />
      </Head>
      <main className='container mx-auto flex min-h-screen flex-col items-center justify-center p-4'>
        { children }
      </main>
    </>
  )
}