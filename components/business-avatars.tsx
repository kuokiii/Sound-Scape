"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BusinessAvatars() {
  return (
    <div className="flex -space-x-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden"
      >
        <Image
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Business user"
          width={32}
          height={32}
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden"
      >
        <Image
          src="https://randomuser.me/api/portraits/men/86.jpg"
          alt="Business user"
          width={32}
          height={32}
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden"
      >
        <Image
          src="https://randomuser.me/api/portraits/women/22.jpg"
          alt="Business user"
          width={32}
          height={32}
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden"
      >
        <Image
          src="https://randomuser.me/api/portraits/men/36.jpg"
          alt="Business user"
          width={32}
          height={32}
          className="object-cover"
        />
      </motion.div>
    </div>
  )
}

