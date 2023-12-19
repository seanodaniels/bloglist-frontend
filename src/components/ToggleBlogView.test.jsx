import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleBlogView from './ToggleBlogView'

describe('<ToggleBlogView />', () => {

  let container

  const likeHandler = jest.fn()

  beforeEach(() => {
    const createBloglist = {
      title: 'UT Title Test',
      author: 'UT Author test',
      likes: 77,
      user: {
        name: 'UT Username test'
      },
      url: 'http://ut.url.test'
    }
  
    // const { container } = render(<ToggleBlogView blog={createBloglist} />)

    container = render(<ToggleBlogView 
      blog={createBloglist} 
      handleLikeSubmit={likeHandler} 
    />).container

  })
  
  test('<ToggleBlogView /> displays blog title and author on default and does not display URL or likes', async () => {

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

  test('Clicking "like" twice causes event handler to be called twice', async () => {
    const user = userEvent.setup()
    const buttonView = container.querySelector('.button-view')
    await user.click(buttonView)
    const buttonLike = container.querySelector('.button-like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})



// })