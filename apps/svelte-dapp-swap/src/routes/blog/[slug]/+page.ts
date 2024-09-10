import { error } from '@sveltejs/kit'
/** @type {import('./$types').PageLoad} */ export function load({ params }) {
  if (params.slug === '404') {
    error(404, 'Not found')
  }

  return {
    title: params.slug,
    content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
  }
}
