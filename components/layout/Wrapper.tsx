import React, { useEffect, useState } from "react"
import Head from "next/head"
import { motion } from "framer-motion"
import { useRouter } from "next/dist/client/router"
import Footer from "./Footer"
import AnimatedNavbar from "./AnimatedNavbar"
import Navbar from "./Navbar"

interface WrapperProps {
  children?: React.ReactNode
  page: string
  appMounted: boolean
}

const meta = {
  title: "Maddie Campbell - Lil tree hugger",
  description: `Lil tree hugger!`,
  type: "website",
  siteName: "Maddies World",
  twitterHandle: "@VaLandscapes",
  url: "https://abcportfolio5a.vercel.app",
  image: "https://danielcoles.dev/meta.png",
  imageAlt: "Logo for danielcoles.dev",
}

const Wrapper: React.FC<WrapperProps> = ({ children, page, appMounted }) => {
  const [initialLoad, setInitialLoad] = useState(true)
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setInitialLoad(!appMounted), [])

  return (
    <div className="selection:text-black selection:bg-rose-300 dark:selection:bg-violet-500 dark:selection:text-white flex flex-col min-h-screen justify-between">
      <Head>
        <title>
          {page} | {meta.title}
        </title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:alt" content={meta.imageAlt} />
        <meta name="twitter:creator" content={meta.twitterHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:image:alt" content={meta.imageAlt} />
      </Head>
      <div className="[ Wrapper ]">
        {initialLoad ? <AnimatedNavbar /> : <Navbar />}
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
          <main className="[ Main ] min-h-screen flex flex-col">
            <div className="max-w-4xl mx-auto mt-16 antialiased px-2 md:px-0 pb-16">{children}</div>
          </main>
        </motion.div>
        <Footer />
      </div>
    </div>
  )
}

export default Wrapper
