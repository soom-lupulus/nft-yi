import React from 'react'
import Image from 'next/image'
import styles from './Empty.module.css' // 创建对应的CSS模块文件
import images from '@/img'

interface EmptyProps {
  title?: string
  description?: string
  image?: string
  imageSize?: number
}

const Empty: React.FC<EmptyProps> = ({
  title = '暂无数据',
  description = '当前没有找到相关内容',
  image = images.empty, // 准备一个空状态SVG图片
  imageSize = 120
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyImage}>
        <Image 
          src={image}
          alt="Empty state"
          width={imageSize}
          height={imageSize}
        />
      </div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyDescription}>{description}</p>
    </div>
  )
}

export default Empty