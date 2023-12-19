import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogListForm from './BlogListForm'

test('Adding a new blog fires the event handler once', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogListForm createBlog={mockHandler} />)

  const inputTitle = container.querySelector('.new-title')
  const inputAuthor = container.querySelector('.new-author')
  const inputUrl = container.querySelector('.new-url')
  const saveButton = container.querySelector('.submit-new-blog')

  await user.type(inputTitle, 'test new title')
  await user.type(inputAuthor, 'test new author')
  await user.type(inputUrl, 'test new url')
  await user.click(saveButton)

  expect(mockHandler.mock.calls).toHaveLength(1)


})
