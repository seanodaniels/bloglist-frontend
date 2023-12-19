import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleBlogView from './ToggleBlogView'

test('<ToggleBlogView /> displays blog title and author on default and does not display URL or likes', async () => {
  const createBloglist = {
    title: 'UT Title Test',
    author: 'UT Author test',
    likes: 77,
    user: {
      name: 'UT Username test'
    },
    url: 'http://ut.url.test'
  }

  const { container } = render(<ToggleBlogView blog={createBloglist} />)

  const elementAuthor = container.querySelector('.blog-author')
  const elementTitle = container.querySelector('.blog-title')
  const elementUrl = container.querySelector('.blog-url')
  const elementLikes = container.querySelector('.blog-likes')

  expect(elementAuthor).toBeVisible()
  expect(elementTitle).toBeVisible()
  expect(elementUrl).not.toBeVisible()
  expect(elementLikes).not.toBeVisible()

})

test('<ToggleBlogView /> displays URL and likes when view button is clicked', async () => {
  const createBloglist = {
    title: 'UT Title Test',
    author: 'UT Author test',
    likes: 77,
    user: {
      name: 'UT Username test'
    },
    url: 'http://ut.url.test'
  }

  const { container } = render(<ToggleBlogView blog={createBloglist} />)

  const user = userEvent.setup()
  const button = container.querySelector('.button-view')
  await user.click(button)

  const elementAuthor = container.querySelector('.blog-author')
  const elementTitle = container.querySelector('.blog-title')
  const elementUrl = container.querySelector('.blog-url')
  const elementLikes = container.querySelector('.blog-likes')

  expect(elementAuthor).toBeVisible()
  expect(elementTitle).toBeVisible()
  expect(elementUrl).toBeVisible()
  expect(elementLikes).toBeVisible()

})