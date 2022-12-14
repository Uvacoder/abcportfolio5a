import React, { useEffect, useState } from "react"
import { NextPage } from "next"
import useSWR from "swr"
import { useTheme } from "next-themes"
import { Wrapper } from "@/components/layout"
import fetcher from "@/utils/api/fetcher"
import { TopTracksData, TrackData } from "@/types/SpotifyData"
import { TrackCard } from "@/components/index"
import { RoughNotationGroup } from "react-rough-notation"
import { Underline } from "@/components/notations"
import { shuffledColours } from "@/utils/helpers"
import { FADE_IN, SLIDE_IN, STAGGER } from "@/utils/variants"
import { motion } from "framer-motion"
import { PageInterface } from "@/types/PageInterface"

const Spotify: NextPage<PageInterface> = ({ appMounted }) => {
  const [loaded, setLoaded] = useState(false)
  const { data } = useSWR<TopTracksData>("/api/getTopTracks", fetcher)

  const { resolvedTheme } = useTheme()
  const { box, underline } = shuffledColours(resolvedTheme)

  useEffect(() => (data ? setLoaded(true) : setLoaded(false)), [data])

  return (
    <Wrapper page="Spotify" appMounted={appMounted}>
      {loaded ? (
        <div className="[ Spotify ]">
          <RoughNotationGroup show={loaded}>
            <motion.div variants={FADE_IN} className="text-4xl font-extrabold">
              <Underline colour={underline[0]} order={1} duration={500}>
                Spotify
              </Underline>
            </motion.div>
            <motion.div variants={FADE_IN} className="pt-4">
              If you know me, you know that I&apos;ll almost always be jamming out to some music and
              fine tuning my playlists with new finds! Below you can see a list of my top songs
              right now.
            </motion.div>
            <motion.div variants={SLIDE_IN} className="p-4"></motion.div>
            <motion.div variants={STAGGER} className="pt-4">
              {data &&
                data.tracks.map((track: TrackData, index: number) => (
                  <motion.div variants={FADE_IN} key={index} className="[ Track ]">
                    <TrackCard
                      track={track}
                      rank={index}
                      notationColour={box[index]}
                      order={index}
                    />
                    <hr className="dark:text-gray-700 text-gray-200" />
                  </motion.div>
                ))}
            </motion.div>
          </RoughNotationGroup>
        </div>
      ) : (
        <div className="spinner">
          <div className="first bg-dark dark:bg-white"></div>
          <div className="second bg-dark dark:bg-white"></div>
          <div className="bg-dark dark:bg-white"></div>
        </div>
      )}
    </Wrapper>
  )
}

export default Spotify
